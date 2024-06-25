import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import imageTexture from '/textures/rock.jpg'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();
const ambientOcclusionTexture = textureLoader.load("/textures/wood/ambientOcclusion.png");
const baseColorTexture = textureLoader.load("/textures/wood/baseColor.png");
const heightTexture = textureLoader.load("/textures/wood/height.png");
const normalTexture = textureLoader.load("/textures/wood/normal.png");
const opacityTexture = textureLoader.load("/textures/wood/opacity.png");
const roughnessTexture = textureLoader.load("/textures/wood/roughness.png");
baseColorTexture.colorSpace = THREE.SRGBColorSpace; // Couleurs plus naturelles

console.log(ambientOcclusionTexture);

// Mesh
const geometry = new THREE.SphereGeometry(1, 40, 40);
// const geometry = new THREE.BoxGeometry(2, 2, 2);
// const material = new THREE.MeshBasicMaterial();
// material.map = baseColorTexture;
// material.aoMap = ambientOcclusionTexture;
// material.transparent = true;
// material.alphaMap = opacityTexture;
// material.roughnessMap = roughnessTexture;
// material.displacementScale = 0.1;

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

const matcapTexture = textureLoader.load("/textures/matcaps.png")
matcapTexture.colorSpace = THREE.SRGBColorSpace

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial()

const material = new THREE.MeshDepthMaterial()

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial()

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('/environmentMap/0.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
})

// MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial()
// const material = new THREE.MeshPhysicalMaterial()

// material.metalness = 0.1
// material.roughness = 0.1
// material.map = baseColorTexture
// material.aoMap = ambientOcclusionTexture
// material.aoMapIntensity = 0.1
// material.displacementMap = heightTexture
// material.displacementScale = 0.1
// material.normalMap = normalTexture
// material.normalScale.set(1, 1)
// material.transparent = true
// material.alphaMap = opacityTexture
// material.clearcoat = 1
// material.clearcoatRoughness = 0.5
//

// // Transmission
// material.transmission = 1
// material.ior = 1.5
// material.thickness = 0.5
//
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [ 100, 800 ]
//
// material.metalness = 1.0
// material.roughness = 1.0

 // Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

// Point light

const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// const material = new THREE.MeshBasicMaterial({ colors: 0xff0000});
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
camera.position.z = 2;
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