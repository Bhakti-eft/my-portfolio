import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // GitHub Pages project sites live under /<repo-name>/.
    // Set VITE_BASE in .env (or in CI) — use "/" for Vercel, Netlify or a custom domain.
    base: env.VITE_BASE || '/',
    plugins: [react()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      target: 'es2020',
      // Three.js is only reached through lazy `import()` calls (HeroScene, WowieScene),
      // so Rollup splits it into async chunks that are NOT downloaded on first paint.
      // Avoid manualChunks here: it can pull shared React code into the 3D chunk
      // and force it to be preloaded.
      chunkSizeWarningLimit: 1000,
    },
  };
});
