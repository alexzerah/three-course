import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

// Mesh
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

// Shader
const material = new THREE.RawShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        random: { value: 0.5 }
        // Nos constantes envoyées du JS au shader
    }
})

material.uniforms.random.value = Math.random();

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

// Update geometry
const count = geometry.attributes.position.count
const randoms = new Float32Array(count)

for(let i = 0; i < count; i++)
{
    randoms[i] = Math.random()
}

geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

// Size
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 1
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Animate
const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()