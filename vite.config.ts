import { defineConfig } from 'vite';

export default defineConfig({
    base: '/stepper-test-task/',

    server: {
        port: 8080,
    },

    preview: {
        port: 4173,
    },
});
