import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import imageTexture from '/textures/rock.jpg'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load(imageTexture);
colorTexture.colorSpace = THREE.SRGBColorSpace; // Couleurs plus naturelles

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

// Size
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.lookAt(mesh.position)
camera.position.z = 1;
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera);

// Events

// Animate

const animate = () => {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate();