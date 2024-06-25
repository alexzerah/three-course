import * as THREE from 'three';
import {gsap} from 'gsap'
import { GUI } from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// GUI
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

// Mesh

const geometry3 = new THREE.BufferGeometry()
const positionsArray = new Float32Array([
    0, 0, 0, // vertex 1
    0, 1, 0, // vertex 2
    1, 0, 0  // vertex 3
])
geometry3.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3))
const material3 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh4 = new THREE.Mesh(geometry3, material3)

mesh4.position.z = 2

// Cube 1

const group = new THREE.Group();
scene.add(group);

const mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "orange" })
)
mesh2.position.x = - 1.5
group.add(mesh2)

const mesh3 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.1),
    new THREE.MeshBasicMaterial({ color: "blue" })
)

group.add(mesh3)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 1.5;
mesh.position.z = -1.5;
mesh.position.y = -2;
mesh.scale.x = 2
mesh.scale.y = 0.5
mesh.scale.z = 0.5
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25

group.rotation.z = Math.PI * 2

group.add(mesh)

group.add(mesh4)

// scene.add(mesh)

// Size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.lookAt(new THREE.Vector3(0, -0, 0));
// camera.lookAt(mesh.position);
scene.add(camera)

// Axes helpers
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.render(scene, camera)

// GUI controls
const cameraGUI = gui.addFolder('Camera');
cameraGUI.add(camera.position, 'x').min(-5).max(5).step(0.01).name('cameraX');
cameraGUI.add(camera.position, 'y').min(-5).max(5).step(0.01).name('cameraY');
cameraGUI.add(camera.position, 'z').min(0).max(10).step(0.01).name('cameraZ');

const groupGUI = gui.addFolder('GROUP');
groupGUI.add(group.position, 'x').min(-3).max(3).step(0.01).name('Mesh3 X Position');
groupGUI.add(group.position, 'y').min(-3).max(3).step(0.01).name('Mesh3 Y Position');
groupGUI.add(group.position, 'z').min(-3).max(3).step(0.01).name('Mesh3 Z Position');

const mesh1GUI = gui.addFolder('MESH 1');
mesh1GUI.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('Mesh3 X Position');
mesh1GUI.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('Mesh3 Y Position');
mesh1GUI.add(mesh.position, 'z').min(-3).max(3).step(0.01).name('Mesh3 Z Position');
mesh1GUI.close();

const mesh2GUI = gui.addFolder('MESH 2');
mesh2GUI.add(mesh2.position, 'x').min(-3).max(3).step(0.01).name('Mesh3 X Position');
mesh2GUI.add(mesh2.position, 'y').min(-3).max(3).step(0.01).name('Mesh3 Y Position');
mesh2GUI.add(mesh2.position, 'z').min(-3).max(3).step(0.01).name('Mesh3 Z Position');
mesh2GUI.close();

const mesh3GUI = gui.addFolder('MESH 3');
mesh3GUI.add(mesh3.position, 'x').min(-3).max(3).step(0.01).name('Mesh3 X Position');
mesh3GUI.add(mesh3.position, 'y').min(-3).max(3).step(0.01).name('Mesh3 Y Position');
mesh3GUI.add(mesh3.position, 'z').min(-3).max(3).step(0.01).name('Mesh3 Z Position');
mesh3GUI.close();

const controls = new OrbitControls(camera, canvas)

// Animate
// const clock = new THREE.Clock()

// const animate = () => {
//     // const elapsedTime = clock.getElapsedTime()
//     // mesh.rotation.y = elapsedTime;
//     // group.position.x = Math.sin(elapsedTime);
//     // group.position.y = Math.cos(elapsedTime);
//     // group.position.z = Math.sin(elapsedTime);
//     // group.rotation.z += 0.001;
//
//     renderer.render(scene, camera)
//     requestAnimationFrame(animate)
// }

// const clock = new THREE.Clock()
//
// const animate = () => {
//     const elapsedTime = clock.getElapsedTime()
//
//     camera.position.x = Math.sin(elapsedTime)
//     camera.position.z = Math.cos(elapsedTime)
//     camera.lookAt(mesh.position)
//
//     renderer.render(scene, camera)
//     requestAnimationFrame(animate)
// }

//
// const animate = () => {
//     requestAnimationFrame(animate);
//
//     // Update camera
//     camera.position.x = cursor.x
//     camera.position.y = cursor.y
//
//     controls.update()
//
//     renderer.render(scene, camera)
// }

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

const animate = () => {
    camera.position.x = cursor.x * 5
    camera.position.y = cursor.y * 5
    camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()

// gsap.to(mesh3.position, { duration: 2, x: 2, repeat: -1, yoyo: true });

console.log(mesh3.position)