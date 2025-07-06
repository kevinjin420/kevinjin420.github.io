import * as THREE from "three";
import Lenis from "lenis";
import { gsap } from "gsap";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

// Exported function to initialize Three.js scene
export const initScene = () => {
  // Lenis scroll handling
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
	gsap.registerPlugin(ScrollTrigger);

  // Canvas element
  const canvas = document.querySelector("canvas.webgl");

  // Scene setup
  const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x87CEEB);

  // Lighting setup
  // Ambient Light (soft light)
  const ambientLight = new THREE.AmbientLight(0x808080, 1); // soft white light
  scene.add(ambientLight);

  // Directional Light (main light source)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // white light
  directionalLight.position.set(2, 3, 2); // Position of light source
  directionalLight.castShadow = true; // Enable shadows
  scene.add(directionalLight);

	const axesHelper = new THREE.AxesHelper( 5 );
	scene.add( axesHelper );

	const loader = new GLTFLoader();
	let loadedObject;
	
	loader.load(
		'meshes/laptop/scene.gltf',
		function (obj) {
			loadedObject = obj.scene;
			loadedObject.position.set(0, -1.5, 0);
			loadedObject.scale.set(0, 0, 0);
			loadedObject.rotation.y = -Math.PI / 2;
			loadedObject.traverse(function (child) {
				if (child.material) {
					child.material.metalness = 0.3
					child.material.roughness = 0.2;
					child.material.envMapIntensity = 2;
					child.material.emissive = new THREE.Color(0x101010);
				}
				child.castShadow = true;
				child.receiveShadow = true;
			});
			scene.add(loadedObject);
			gsap.to(loadedObject.scale, {
				x: 1,
				y: 1,
				z: 1,
				scrollTrigger: {
					trigger: canvas,
					start: "top bottom",  // When the top of the canvas reaches the bottom of the viewport
					end: "bottom top",    // When the bottom of the canvas reaches the top of the viewport
					scrub: true,          // Smoothly animate the scale based on scroll
					markers: false        // Optional: display scroll markers for debugging
				}
			});
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},
		function (error) {
			console.error('An error happened: ', error);
		}
	);

  // Sizes for window resizing
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Resize event listener
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  window.addEventListener("dblclick", () => {
    const fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  });

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100,
  );
  camera.position.z = 3;
  scene.add(camera);

  // OrbitControls for the camera
  // const controls = new OrbitControls(camera, canvas);
  // controls.enableDamping = true;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.physicallyCorrectLights = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 2.5;

  // Animation loop (tick)
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // Update controls and render
    // controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };

  tick(); // Start the animation loop

  return () => {
    lenis.destroy(); // Cleanup Lenis when component unmounts
    renderer.dispose(); // Dispose renderer
  };
};
