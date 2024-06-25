import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import restart from 'vite-plugin-restart'
import { resolve } from 'path'

export default defineConfig({
    root: 'src/', // Sources files (typically where index.html is)
    publicDir: '../public/', // Path from "root" to static assets (files that are served as they are)
    server: {
        host: true, // Open to local network and display URL
    },
    build: {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true, // Add sourcemap
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/s1.html'),
                ex2: resolve(__dirname, 'src/ex2-three-three/index.html'),
                ex3: resolve(__dirname, 'src/ex3-3d-scene-3d-scene/index.html'),
                ex4: resolve(__dirname, 'src/ex4-coordinates-coordinates/index.html'),
                ex5: resolve(__dirname, 'src/ex5-animate-animate/index.html'),
                ex6: resolve(__dirname, 'src/ex6-gui-gui/index.html'),
                ex7: resolve(__dirname, 'src/ex7-geometry-geometry/index.html'),
                ex8: resolve(__dirname, 'src/ex8-camera-camera/index.html'),
                ex9: resolve(__dirname, 'src/ex9-resize-and-fullscreen-resize-and-fullscreen/index.html'),
                ex10: resolve(__dirname, 'src/2-end/ex10-textures-textures/index.html'),
                ex11: resolve(__dirname, 'src/2-end/ex11-materoals/index.html'),
                ex12: resolve(__dirname, 'src/ex12-light-light/index.html'),
                ex13: resolve(__dirname, 'src/ex13-particles-particles/index.html'),
                ex14: resolve(__dirname, 'src/ex14-event-event/index.html'),
                ex15: resolve(__dirname, 'src/ex15-shaders-shaders/index.html'),
                end_ex17: resolve(__dirname, 'src/2-end/ex17-shaders-codrops/index.html'),
                s1: resolve(__dirname, 'src/s1/index.html'),
            }
        }
    },
    plugins: [
        restart({ restart: ['../public/**'] }), // Restart server on static file change
        glsl()
    ],
})
