import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

const joints = [
  {
    name: 'chassis',
    file: 'rover_chassis.fbx',
    translation: [0.164882, -0.200235, 0.051497],
    rotation: [0, 0, 0]
  },
  {
    name: 'a',
    file: 'arm_a.fbx',
    translation: [0.034346, 0, 0.049024],
    rotation: [0, 0, 0]
  },
  {
    name: 'b',
    file: 'arm_b.fbx',
    translation: [0.534365, 0, 0.009056],
    rotation: [0, 0, 0]
  },
  {
    name: 'c',
    file: 'arm_c.fbx',
    translation: [0.546033, 0, 0.088594],
    rotation: [0, 0, 0]
  },
  {
    name: 'd',
    file: 'arm_d.fbx',
    translation: [0.044886, 0, 0],
    rotation: [0, 0, 0]
  },
  {
    name: 'e',
    file: 'arm_e.fbx',
    translation: [0.044886, 0, 0],
    rotation: [0, 0, 0]
  }
] as const

const RoverThree: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(1.25, 1.25, 1.25)
    camera.up.set(0, 0, 1)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    scene.background = new THREE.Color(0xcccccc)

    const light = new THREE.DirectionalLight(0xffffff, 0.5)
    light.position.set(1, 2, 3)
    scene.add(light)

    const loader = new FBXLoader()
    joints.forEach(joint => {
        const path = `/meshes/${joint.file}`
      loader.load(path ,
        (fbx) => {
          fbx.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh
              mesh.name = joint.name
              mesh.material = new THREE.MeshStandardMaterial({
                color: joint.name === 'd' || joint.name === 'e' ? 0x00ff00 : 0xffffff
              })
              mesh.scale.set(1, 1, 1)
              mesh.position.set(0, 0, 0)
              scene.add(mesh)
            }
          })
        },
        undefined,
        (error) => console.error('FBX load error:', error, path)
      )
    })

    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '500px' }} />
}

export default RoverThree
