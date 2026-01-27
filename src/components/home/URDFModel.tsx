import { useEffect, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import URDFLoader from 'urdf-loader'

const DEFAULT_JOINT_VALUES: Record<string, number> = {
  chassis_to_arm_a: 24.14,
  arm_a_to_arm_b: -0.785,
  arm_b_to_arm_c: 1.91,
  arm_c_to_arm_d: -1,
  arm_d_to_arm_e: -1.57,
  gripper_link: 0,
}

interface URDFModelProps {
  urdfPath: string
  position: [number, number, number]
  rotation: [number, number, number]
  onLoaded?: () => void
}

type URDFJoint = {
  setJointValue: (value: number) => void
}

type RobotWithJoints = THREE.Object3D & {
  joints?: Record<string, URDFJoint>
}

export function URDFModel({ urdfPath, position, rotation, onLoaded }: URDFModelProps) {
  const [robot, setRobot] = useState<THREE.Object3D | null>(null)
  const robotRef = useRef<RobotWithJoints | null>(null)
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const manager = new THREE.LoadingManager()
    const loader = new URDFLoader(manager)
    let loadedRobot: THREE.Object3D | null = null
    const timeoutIds: number[] = []
    let isMounted = true

    loader.packages = { mrover: '/urdf' }

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')
    const gltfLoader = new GLTFLoader(manager)
    gltfLoader.setDRACOLoader(dracoLoader)
    ;(loader as any).loadMeshCb = (
      path: string,
      _manager: THREE.LoadingManager,
      onComplete: (obj: THREE.Object3D) => void
    ) => {
      gltfLoader.load(
        path,
        (gltf) => onComplete(gltf.scene),
        undefined,
        (err) => console.error('Failed to load mesh:', path, err)
      )
    }

    loader.load(urdfPath, (result) => {
      loadedRobot = result
    })

    manager.onLoad = () => {
      if (!loadedRobot) return

      let lastMeshCount = 0
      let stableCount = 0

      const checkMeshes = () => {
        let currentMeshCount = 0
        loadedRobot!.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) currentMeshCount++
        })

        if (currentMeshCount > 0 && currentMeshCount === lastMeshCount) {
          stableCount++
        } else {
          stableCount = 0
          lastMeshCount = currentMeshCount
        }

        if (stableCount >= 3) {
          loadedRobot!.rotation.x = -Math.PI / 2
          const texturePromises: Promise<void>[] = []

          loadedRobot!.traverse((child: THREE.Object3D) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true
              child.receiveShadow = true
              const mat = child.material as THREE.MeshStandardMaterial
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.roughness = Math.min(mat.roughness, 0.7)
                if (mat.map && !mat.map.image) {
                  texturePromises.push(
                    new Promise<void>((resolve) => {
                      const checkLoaded = () => {
                        if (!isMounted) return resolve()
                        if (mat.map?.image) resolve()
                        else timeoutIds.push(window.setTimeout(checkLoaded, 50))
                      }
                      checkLoaded()
                    })
                  )
                }
              }
            }
          })

          const robotWithJoints = loadedRobot as THREE.Object3D & {
            setJointValue?: (name: string, value: number) => void
          }
          if (robotWithJoints.setJointValue) {
            for (const [joint, value] of Object.entries(DEFAULT_JOINT_VALUES)) {
              robotWithJoints.setJointValue(joint, value)
            }
          }

          Promise.all(texturePromises).then(() => {
            if (isMounted) {
              robotRef.current = loadedRobot as RobotWithJoints
              setRobot(loadedRobot)
              onLoaded?.()
            }
          })
        } else {
          timeoutIds.push(window.setTimeout(checkMeshes, 100))
        }
      }

      checkMeshes()
    }

    return () => {
      isMounted = false
      timeoutIds.forEach((id) => clearTimeout(id))
    }
  }, [urdfPath])

  useFrame(() => {
    if (groupRef.current) {
      const t = performance.now() * 0.001
      groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.3) * 0.15
    }
  })

  if (!robot) return null

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <primitive object={robot} />
    </group>
  )
}
