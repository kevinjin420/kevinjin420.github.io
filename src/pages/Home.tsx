import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    /**
     * Scene
     */
    const scene = new THREE.Scene()

    /**
     * Object
     */
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    /**
     * Camera
     */
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.z = 3
    scene.add(camera)

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    /**
     * Controls
     */
    const controls = new OrbitControls(camera, canvasRef.current)
    controls.enableDamping = true

    /**
     * Handle Resize
     */
    const handleResize = () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('resize', handleResize)

    /**
     * Fullscreen
     */
    const handleDblClick = () => {
      const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

      if (!fullscreenElement) {
        if (canvasRef.current?.requestFullscreen) {
          canvasRef.current.requestFullscreen()
        } else if ((canvasRef.current as any)?.webkitRequestFullscreen) {
          (canvasRef.current as any).webkitRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen()
        }
      }
    }

    window.addEventListener('dblclick', handleDblClick)

    /**
     * Animate
     */
    const clock = new THREE.Clock()

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()

      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }

    tick()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('dblclick', handleDblClick)
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="webgl" />
}

export default ThreeScene
