import * as THREE from 'three';

console.log(THREE);

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Helpers
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)

// Group
const group = new THREE.Group()
const group2 = new THREE.Group()


// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.z = Math.PI * 0.25;
mesh.position.x = 2;
console.log(mesh.position.length())
// scene.add(mesh)

// Mesh 2
const geometry2 = new THREE.BoxGeometry(1, 1, 1)
const material2 = new THREE.MeshBasicMaterial({ color: "blue" })
const mesh2 = new THREE.Mesh(geometry2, material2)
mesh2.position.y = -2


// Mesh3
const geometry3 = new THREE.BoxGeometry(1, 1, 1)
const material3 = new THREE.MeshBasicMaterial({ color: "orange" })
const mesh3 = new THREE.Mesh(geometry3, material3)

group.add(mesh)
group.add(mesh2)
group.add(mesh3)

group2.add(mesh)

group.rotation.x = Math.PI * 0.25
group2.rotation.x = Math.PI * 0.25

scene.add(group2)
scene.add(group)

// Size
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.lookAt(0,0,0)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)

// Events

// Animate