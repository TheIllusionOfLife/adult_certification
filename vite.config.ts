import { defineConfig } from 'vite';

export default defineConfig({
    base: './', // Use relative paths for assets so it works in itch.io iframe/subpath
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    }
});
