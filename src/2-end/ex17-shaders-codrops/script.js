import * as THREE from 'three';
import { gsap } from 'gsap';

// Shaders
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment2.glsl';

// Canvas
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

// Scene
const scene = new THREE.Scene();

// Camera
const perspective = 800;
const fov = (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI;
const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, perspective);
scene.add(camera);

// Image
const $image = document.querySelector('.tile__image');
const loader = new THREE.TextureLoader();

const image = loader.load($image.src, () => {

    // hover
    const hoverImage = loader.load($image.dataset.hover, () => {
        $image.style.opacity = 0;

        // Sizes and offset
        const sizes = new THREE.Vector2(0, 0);
        const offset = new THREE.Vector2(0, 0);
        const { width, height, top, left } = $image.getBoundingClientRect();
        sizes.set(width, height);
        offset.set(
            left - window.innerWidth / 2 + width / 2,
            -top + window.innerHeight / 2 - height / 2
        );

        // Geometry
        const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

        // Uniforms
        const uniforms = {
            u_image: { type: 't', value: image },
            u_imagehover: { type: 't', value: hoverImage },
            u_mouse: { value: new THREE.Vector2(0, 0) },
            u_time: { value: 0 },
            u_res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        };

        // Material
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            defines: {
                PR: window.devicePixelRatio.toFixed(1)
            }
        });

        // Mesh
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(offset.x, offset.y, 0);
        mesh.scale.set(sizes.x, sizes.y, 1);
        scene.add(mesh);

        // Mouse movement
        const mouse = new THREE.Vector2(0, 0);
        window.addEventListener('mousemove', (event) => {
            gsap.to(mouse, 0.5, {
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1
            });

            uniforms.u_mouse.value = mouse;

            gsap.to(mesh.rotation, 0.5, {
                x: -mouse.y * 0.3,
                y: mouse.x * (Math.PI / 6)
            })
        });

        // Animate
        function animate() {
            uniforms.u_time.value += 0.01;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        animate();

        // Resize event
        window.addEventListener('resize', () => {
            const sizes = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            uniforms.u_res.value.set(sizes.width, sizes.height);
        });
    });
});

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);