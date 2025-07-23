import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FBXLoader } from "three/examples/jsm/Addons.js";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import { modelDirection } from "three/tsl";

gsap.registerPlugin(ScrollTrigger);

// Exported function to initialize Three.js scene
export const initScene = () => {
  gsap.ticker.lagSmoothing(0);

  const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;

  // Canvas element
  const canvas = document.querySelector("canvas.webgl");

  // Scene setup
  const scene = new THREE.Scene();

  // Lighting setup
  // Ambient Light (soft light)
  const ambientLight = new THREE.AmbientLight(0x404040, 1); // soft white light
  scene.add(ambientLight);

  // Directional Light (main light source)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // white light
  directionalLight.position.set(2, 5, 5); // Position of light source
  directionalLight.castShadow = true; // Enable shadows
  scene.add(directionalLight);

  // Optional: Point Light (localized light effect)
  const pointLight = new THREE.PointLight(0xff0000, 1, 100); // red light
  pointLight.position.set(0, 10, 0); // position of point light
  scene.add(pointLight);

  // Object setup (Cube)
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const loadingManager = new THREE.LoadingManager();

  // Show loader at start (it's already visible)
  loadingManager.onStart = () => {
    console.log("Loading started");
  };

  // Hide loader after all are done
  let loaderEl;
  loadingManager.onLoad = () => {
    console.log("All assets loaded");
    loaderEl = document.getElementById("loader");
    if (loaderEl) loaderEl.style.display = "none";
  };

  // Optional: on progress
  loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
    console.log(`Loading ${url} (${itemsLoaded}/${itemsTotal})`);
  };

  // Optional: on error
  loadingManager.onError = (url) => {
    console.error(`Error loading ${url}`);
  };

  // Use the loading manager in your loaders
  const loader = new OBJLoader(loadingManager);

  let vectorToolhead;
  let fanHub;
  let idlerAssembly;

  loader.load(
    "voron/toolhead.obj",
    function (obj) {
      vectorToolhead = obj;
      vectorToolhead.position.set(0, -5.5, -0.55);
      vectorToolhead.scale.set(0.2, 0.2, 0.2);
      vectorToolhead.rotation.x = -Math.PI / 2;
      vectorToolhead.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xced8f7,
            metalness: 0.5,
            roughness: 0.5,
          });
        }
        child.castShadow = true;
        child.receiveShadow = true;
      });
      scene.add(vectorToolhead);
    },
    function (xhr) {
      // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.error("An error happened: ", error);
    },
  );

  loader.load(
    "voron/fan_hub.obj",
    function (obj) {
      fanHub = obj;

      // If the loaded object is a group, traverse through its children to find the mesh
      fanHub.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          // Compute the bounding box for each mesh
          child.geometry.computeBoundingBox();
          const center = new THREE.Vector3();
          child.geometry.boundingBox.getCenter(center);

          // Translate the geometry to its center
          child.geometry.translate(-center.x, -center.y, -center.z);

          // Apply materials after the translation
          child.material = new THREE.MeshStandardMaterial({
            color: 0xced8f7,
            metalness: 0.3,
            roughness: 0.5,
            wireframe: false,
          });
        }
      });

      // Now we add the object to the scene
      fanHub.position.set(-0.013, 0.1107, 0.345);
      fanHub.scale.set(0.2, 0.2, 0.2);
      fanHub.rotation.x = -Math.PI;

      scene.add(fanHub);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error("An error happened: ", error);
    },
  );

  loader.load(
    "voron/gantry.obj",
    function (obj) {
      idlerAssembly = obj;
      idlerAssembly.position.set(0, -5.5, -0.55);
      idlerAssembly.scale.set(0.2, 0.2, 0.2);
      idlerAssembly.rotation.x = -Math.PI / 2;
      idlerAssembly.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0x666666,
            metalness: 0.5,
            roughness: 0.5,
            wireframe: true,
          });
        }
      });
      scene.add(idlerAssembly);
    },
    function (xhr) {
      // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.error("An error happened: ", error);
    },
  );

  // Sizes for window resizing
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight - navbarHeight,
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
  camera.position.z = 4;
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

	// gsap scroll watchers
	
	gsap.to(camera.position, {
		z: 15,
		scrollTrigger: {
			trigger: document.body,
			start: "top top",
			end: "+=1000", // scroll distance in pixels
			scrub: true,
			pin: true,     // keeps canvas fixed while scrolling
		},
	});

  // Animation loop (tick)
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    if (fanHub) {
      fanHub.rotation.z = -elapsedTime * 20;
    }
    if (loaderEl) {
      loaderEl.style.top = `${navbarHeight}px`;
      loaderEl.style.height = `calc(100vh - ${navbarHeight}px)`;
    }

    // Update controls and render
    // controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };

  tick(); // Start the animation loop

  return () => {
    renderer.dispose(); // Dispose renderer
  };
};
