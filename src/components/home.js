import * as THREE from "three";
import GUI from "lil-gui";
import { gsap } from "gsap";
import URDFLoader from "urdf-loader";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";

const wheelStart = -14;

const startJointValues = {
  chassis_to_arm_a: 24,
  arm_a_to_arm_b: 0,
  arm_b_to_arm_c: 0,
  arm_c_to_arm_d: 0,
  arm_d_to_arm_e: 0,
  gripper_link: 8,
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

let rover = null;
let jointTweenObject = {};

export default function initScene(loadingCallback) {
  const gui = new GUI({ width: 400 });
  gui.hide(); // Hidden by default for production
  const cursor = { x: 0, y: 0 };

  gsap.ticker.lagSmoothing(0);

  const canvas = document.querySelector("canvas.webgl");
  const scene = new THREE.Scene();
  const cameraGroup = new THREE.Group();
  scene.add(cameraGroup);
  scene.background = new THREE.Color(0x0a0a1a);

  // --- Lighting Setup ---
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
  mainLight.position.set(-30, 150, 100);
  mainLight.castShadow = true;
  // ... shadow properties
  scene.add(mainLight);
  const fillLight = new THREE.DirectionalLight(0x9eb4d0, 1.0);
  fillLight.position.set(-150, 100, -100);
  scene.add(fillLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(2, 3, 2);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const manager = new THREE.LoadingManager();

  // We return a promise that resolves with the animation timeline once assets are loaded.
  const animationPromise = new Promise((resolve) => {
    manager.onLoad = () => {
      console.log("Loading complete!");
      if (loadingCallback) loadingCallback();

      // This timeline will be controlled by ScrollTrigger in React
      const scrollTimeline = gsap.timeline();

      // 1. Animate Rover Position
      scrollTimeline.to(rover.position, {
        x: 20,
        y: 0,
        z: 0,
        ease: "power2.inOut",
      });

      // 2. Animate Rover Joints
      scrollTimeline.to(
        jointTweenObject,
        {
          ...endJointValues,
          ease: "power2.inOut",
          onUpdate: () => {
            for (const jointName in jointTweenObject) {
              if (rover.joints[jointName]) {
                rover.joints[jointName].setJointValue(
                  jointTweenObject[jointName],
                );
              }
            }
          },
        },
        "<",
      );

      // 3. Animate Camera Position and LookAt
      const lookAtTarget = new THREE.Vector3(0, 0, 0);
      const startPosition = { x: 200, y: 150, z: 250 };
      const endPosition = { x: 150, y: 60, z: 130 };
      const startLookAt = new THREE.Vector3(0, 0, -50);
      const endLookAt = new THREE.Vector3(105, 70, 0);

      camera.position.set(startPosition.x, startPosition.y, startPosition.z);
      lookAtTarget.copy(startLookAt);
      camera.lookAt(lookAtTarget);

      scrollTimeline.to(
        camera.position,
        {
          x: endPosition.x,
          y: endPosition.y,
          z: endPosition.z,
          ease: "power2.inOut",
          onUpdate: () => camera.lookAt(lookAtTarget),
        },
        "<",
      );

      scrollTimeline.to(
        lookAtTarget,
        {
          x: endLookAt.x,
          y: endLookAt.y,
          z: endLookAt.z,
          ease: "power2.inOut",
        },
        "<",
      );

      resolve(scrollTimeline);
    };
  });

  const urdfLoader = new URDFLoader(manager);
  urdfLoader.packages = { mrover: "/urdf" };
  urdfLoader.load("/urdf/rover/rover.urdf", (robot) => {
    rover = robot;
    robot.position.set(-300, 0, 0); // Set initial position
    robot.rotation.x = -Math.PI / 2;
    robot.updateMatrixWorld();
    scene.add(robot);

    jointTweenObject = { ...startJointValues }; // Set initial joint values
    for (const jointName in jointTweenObject) {
      if (robot.joints[jointName]) {
        robot.joints[jointName].setJointValue(jointTweenObject[jointName]);
      }
    }

    // GUI setup for debugging (unchanged)
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
        const paramObj = { value: initialValue };
        obj.setJointValue(initialValue);
        gui
          .add(paramObj, "value", min, max, 0.01)
          .name(`${name} (${obj.jointType})`)
          .onChange((value) => {
            obj.setJointValue(value);
          });
      }
    });
  });

  const colladaLoader = new ColladaLoader(manager);
  colladaLoader.load("/urdf/meshes/ground.dae", (collada) => {
    const groundScene = collada.scene;
    groundScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x00ffff,
          blending: THREE.NormalBlending,
          opacity: 0.35,
          transparent: true,
          depthWrite: false,
        });
        const wireframe = new THREE.LineSegments(child.geometry, lineMaterial);
        wireframe.position.set(0, 0, 0);
        wireframe.rotation.x = -Math.PI / 2;
        wireframe.scale.set(20, 20, 20);
        scene.add(wireframe);
      }
    });
  });

  const sizes = { width: window.innerWidth, height: window.innerHeight };

  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000,
  );
  cameraGroup.add(camera);

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // ... other renderer settings

  // --- Event Handlers for cleanup ---
  const handleMouseMove = (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    // cursor.y = event.clientY / sizes.height - 0.5;
  };
  const handleResize = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  const handleDoubleClick = () => {
    const fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement;
    if (!fullscreenElement) {
      if (canvas.requestFullscreen) canvas.requestFullscreen();
      else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", handleResize);
  window.addEventListener("dblclick", handleDoubleClick);

  const clock = new THREE.Clock();
  const tick = () => {
    const targetTiltY = -cursor.x * 0.2;
    const targetTiltX = -cursor.y * 0.2;
    cameraGroup.rotation.y += (targetTiltY - cameraGroup.rotation.y) * 0.01;
    cameraGroup.rotation.x += (targetTiltX - cameraGroup.rotation.x) * 0.01;
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();

  return {
    cleanup: () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("dblclick", handleDoubleClick);
      renderer.dispose();
      gui.destroy();
    },
    animationPromise,
  };
}
