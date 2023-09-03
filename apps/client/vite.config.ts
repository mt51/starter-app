import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],

  css: {
    postcss: {
      plugins: [
        tailwindcss({
          content: [
            '../client/index.html',
            '../client/src/**/*.{ts,tsx,js,jsx}',
          ],
        }),
        require('autoprefixer'),
      ],
    },
  },
});
