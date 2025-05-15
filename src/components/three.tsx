import * as THREE from 'three';
// import gsap from 'gsap'
import { useEffect, useRef } from "react";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

function MyThree() {
	const refContainer = useRef<HTMLDivElement | null>(null);
	const initialized = useRef(false);

	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0x4A6DE5)
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		refContainer.current?.appendChild(renderer.domElement); // check before rendering for strict mode

		const light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(0, 1, 1).normalize();
		scene.add(light);

		let loadedObject: THREE.Object3D | null = null;

		const loader = new OBJLoader();
		loader.load(
			'goliath.obj',
			function (obj) {
				loadedObject = obj;
				loadedObject.scale.set(0.4, 0.4, 0.4);
				loadedObject.rotation.x = -Math.PI / 2;
				loadedObject.traverse(function (child) {
					if (child instanceof THREE.Mesh) {
						child.material = new THREE.MeshBasicMaterial({ color: 0xCED8F7, wireframe: true });
					}
				});
				scene.add(loadedObject);
			},
			function (xhr) {
				console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			},
			function (error) {
				console.error('An error happened', error);
			}
		);

		camera.position.set(0, 1, 5);
		camera.lookAt(0, 0, 0)

		const time = Date.now();
		function animate() {
			const timeNow = Date.now();
			const delta = timeNow - time;

			if (loadedObject) {
				loadedObject.rotation.z = 0.0002 * delta;
			}
			renderer.render(scene, camera);
			requestAnimationFrame(animate);
		}

		animate();

		return () => {
			scene.clear();
			renderer.dispose();
		};
	}, []);

	return <div ref={refContainer} />;
}

export default MyThree;
