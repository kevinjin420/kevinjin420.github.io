import * as THREE from "three";
import GUI from "lil-gui";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import URDFLoader from "urdf-loader";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";

const wheelStart = -9;

const startJointValues = {
  chassis_to_arm_a: 24,
  arm_a_to_arm_b: 0,
  arm_b_to_arm_c: 0,
  arm_c_to_arm_d: 0,
  arm_d_to_arm_e: 0,
  gripper_link: 40,
  left_bogie_to_front_left_wheel: wheelStart,
  left_bogie_to_center_left_wheel: wheelStart,
  left_rocker_to_back_left_wheel: wheelStart,
  right_bogie_to_front_right_wheel: wheelStart,
  right_bogie_to_center_right_wheel: wheelStart,
  right_rocker_to_back_right_wheel: wheelStart,
};

const endJointValues = {
  chassis_to_arm_a: 24,
  arm_a_to_arm_b: -0.785,
  arm_b_to_arm_c: 1.91,
  arm_c_to_arm_d: -1.2,
  arm_d_to_arm_e: -1.57,
  gripper_link: 0,
  left_bogie_to_front_left_wheel: 0,
  left_bogie_to_center_left_wheel: 0,
  left_rocker_to_back_left_wheel: 0,
  right_bogie_to_front_right_wheel: 0,
  right_bogie_to_center_right_wheel: 0,
  right_rocker_to_back_right_wheel: 0,
};

export const initScene = (loadingCallback) => {
  const gui = new GUI({ width: 400 });
  const cursor = { x: 0, y: 0 };

  gsap.ticker.lagSmoothing(0);
  gsap.registerPlugin(ScrollTrigger);

  // Canvas element
  const canvas = document.querySelector("canvas.webgl");

  // Scene setup
  const scene = new THREE.Scene();
  const cameraGroup = new THREE.Group();
  scene.add(cameraGroup);
  scene.background = new THREE.Color(0x0a0a1a);

  // Lighting setup

  // Ambient Light: Provides a soft, global illumination.
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Main Light (Key Light): The primary, strong light source.
  const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
  mainLight.position.set(-30, 150, 100);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  mainLight.shadow.camera.near = 0.5;
  mainLight.shadow.camera.far = 500;
  mainLight.shadow.camera.left = -150;
  mainLight.shadow.camera.right = 150;
  mainLight.shadow.camera.top = 150;
  mainLight.shadow.camera.bottom = -150;
  scene.add(mainLight);

  // Fill Light: Softens harsh shadows from the main light.
  const fillLight = new THREE.DirectionalLight(0x9eb4d0, 1.0);
  fillLight.position.set(-150, 100, -100);
  scene.add(fillLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(2, 3, 2);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  const manager = new THREE.LoadingManager();
  manager.onLoad = () => {
    console.log("Loading complete!");
    if (loadingCallback) {
      loadingCallback();
    }
  };

  const urdfLoader = new URDFLoader(manager);
  urdfLoader.packages = {
    mrover: "/urdf",
  };

urdfLoader.load(
    "/urdf/rover/rover.urdf",
    (robot) => {
      // --- SET INITIAL ROVER STATE ---
      robot.position.set(-200, 0, 0); // Start position
      robot.rotation.x = -Math.PI / 2;
      robot.updateMatrixWorld();
      scene.add(robot);

      // Create a copy of start values for the tweening object
      const jointTweenObject = { ...startJointValues };

      // Set the robot's joints to their initial state
      for (const jointName in jointTweenObject) {
        if (robot.joints[jointName]) {
          robot.joints[jointName].setJointValue(jointTweenObject[jointName]);
        }
      }

      // rover position
      gsap.to(robot.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 4,
        ease: "power2.out",
      });

      // rover joints
      gsap.to(jointTweenObject, {
        ...endJointValues, // Animate to the end values
        duration: 4,
        ease: "power2.out",
        onUpdate: () => {
          // On each frame of the tween, update the actual robot joints
          for (const jointName in jointTweenObject) {
            if (robot.joints[jointName]) {
              robot.joints[jointName].setJointValue(jointTweenObject[jointName]);
            }
          }
        },
      });


      // --- GUI SETUP (No changes here) ---
      robot.traverse((obj) => {
        if (
          obj.jointType === "revolute" ||
          obj.jointType === "continuous" ||
          obj.jointType === "prismatic"
        ) {
          const name = obj.name || "unnamed_joint";
          const initialValue =
            typeof endJointValues[name] === "number"
              ? endJointValues[name]
              : typeof obj.jointValue === "number"
              ? obj.jointValue
              : 0;
          const min = obj.limit?.lower ?? -Math.PI;
          const max = obj.limit?.upper ?? Math.PI;
          const folder = gui.addFolder(name);
          const paramObj = { value: initialValue };
          obj.setJointValue(initialValue);
          folder
            .add(paramObj, "value", min, max, 0.01)
            .name(`${name} (${obj.jointType})`)
            .onChange((value) => {
              obj.setJointValue(value);
            });
        }
      });
    },
    undefined,
    (err) => {
      console.error("Failed to load URDF:", err);
    },
  );

  const colladaLoader = new ColladaLoader(manager);
  colladaLoader.load(
    "/urdf/meshes/ground.dae",
    (collada) => {
      const groundScene = collada.scene;
      groundScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const geometry = child.geometry;

          // Use a LineBasicMaterial for the wireframe
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00ffff,
            // --- CHANGES HERE ---
            blending: THREE.NormalBlending, // Change from AdditiveBlending to remove glow
            opacity: 0.35, // Make lines much less opaque
            transparent: true, // Opacity requires this to be true
            depthWrite: false,
          });

          // Create LineSegments instead of Points
          const wireframe = new THREE.LineSegments(geometry, lineMaterial);

          // Position and scale the wireframe ground
          wireframe.position.set(0, 0, 0);
          wireframe.rotation.x = -Math.PI / 2;
          wireframe.scale.set(20, 20, 20);

          scene.add(wireframe);
        }
      });
    },
    undefined,
    (err) => {
      console.error("Failed to load Collada file:", err);
    },
  );

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
  });

  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
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

  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000,
  );

  // const controls = new OrbitControls(camera, canvas);
  // controls.enableDamping = true;
  // controls.target.set(0, 0, 0);

  // A dummy object to act as the lookAt target, replacing `controls.target`
  const lookAtTarget = new THREE.Vector3(0, 0, 0);

  const startPosition = { x: 200, y: 150, z: 250 };
  const endPosition = { x: 150, y: 60, z: 130 };

  const startLookAt = new THREE.Vector3(0, 0, -50);
  const endLookAt = new THREE.Vector3(105, 70, 0);

  camera.position.set(startPosition.x, startPosition.y, startPosition.z);
  lookAtTarget.copy(startLookAt);
  camera.lookAt(lookAtTarget);
  cameraGroup.add(camera);

  // Animate the camera's position
  gsap.to(camera.position, {
    x: endPosition.x,
    y: endPosition.y,
    z: endPosition.z,
    duration: 3,
    ease: "power2.inOut",
    onUpdate: () => {
      camera.lookAt(lookAtTarget);
    },
  });
  gsap.to(lookAtTarget, {
    x: endLookAt.x,
    y: endLookAt.y,
    z: endLookAt.z,
    duration: 3,
    ease: "power2.inOut",
  });

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
  renderer.toneMappingExposure = 1.5;

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // --- Tilting Logic ---
    // Define how much the camera should tilt. Adjust this value for more/less sensitivity.
    const tiltFactor = 0.2; 
    
    // Calculate the target rotation based on cursor position
    const targetTiltY = -cursor.x * tiltFactor; // Move cursor right -> rotate camera left
    const targetTiltX = -cursor.y * tiltFactor; // Move cursor up -> rotate camera up

    // Use a smoothing formula (lerp) to make the tilt feel natural
    cameraGroup.rotation.y += (targetTiltY - cameraGroup.rotation.y) * 0.01;
    cameraGroup.rotation.x += (targetTiltX - cameraGroup.rotation.x) * 0.01;
    // --- End of Tilting Logic ---

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };

  tick();

  return () => {
    renderer.dispose();
  };
};
