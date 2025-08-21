import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    root: 'src',
    resolve: {
        alias: {
            'bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
            '@scripts': resolve(__dirname, 'src/scripts'),
            '@styles': resolve(__dirname, 'src/styles'),
        }
    },
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                about: resolve(__dirname, 'src/about.html'),
                blog: resolve(__dirname, 'src/blog.html'),
                contact: resolve(__dirname, 'src/contact.html'),
                detail_blog: resolve(__dirname, 'src/detail_blog.html'),
                pricing: resolve(__dirname, 'src/pricing.html'),
            }
        }
    },
    server: {
        port: 3000
    }
})
