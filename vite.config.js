import {defineConfig, splitVendorChunkPlugin} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),splitVendorChunkPlugin()],
  resolve: {
    alias: {
      '@libs': path.resolve(__dirname, 'src/libs'),
    },
  },
  // build: {
  //   rollupOptions: {
  //     // https://rollupjs.org/guide/en/#outputmanualchunks
  //     output: {
  //       manualChunks: {
  //         'huge': [
  //           './src/components/Huge.vue',
  //         ],
  //       },
  //     },
  //   },
  // },
})
