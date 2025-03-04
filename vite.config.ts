import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const dbHOST = env.DB_HOST
  const proxyConfigLocal = {
    '/data': {
      target: dbHOST,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/\/data/, '')
    },
  }

  return {
    plugins: [react()],
    optimizeDeps: {
      include: [
        '@mui/material/Tooltip',
        '@emotion/styled',
        '@emotion/react',
      ],
    },
    server: {
      port: 3001,
      proxy: proxyConfigLocal
    }
  }
})
