import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    UnoCSS({
      presets: [
        presetUno(), // 默认预设
        presetAttributify(), // 属性化模式支持
        presetIcons({ // 图标预设
          scale: 1.2, // 图标缩放
          warn: true, // 图标缺失警告
        }),
      ],
      // 自定义规则
      rules: [
        ['m-1', { margin: '0.25rem' }],
        [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) / 4}rem` })],
      ],
      // 快捷方式
      shortcuts: {
        'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
        'btn-primary': 'btn bg-blue-500 text-white hover:bg-blue-700',
      },
      // 主题
      theme: {
        colors: {
          primary: '#3b82f6', // 自定义主色
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  
  // 添加服务器配置，包含代理设置
  server: {
    host: '0.0.0.0',
    port: 3000, // 设置开发服务器端口
    open: true, // 自动打开浏览器
    cors: true, // 允许跨域
    proxy: {
      // 配置代理
      '/api': {
        target: 'http://192.168.200.122:18080', // 替换为您的后端API地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
        secure: false, // 如果是https接口，需要配置这个参数
      },
      '/hls': {
        target: 'https://zhongdong-stream.startvs.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hls/, ''),
        headers: {
          Referer: 'https://zhongdong-stream.startvs.net',
          Origin: 'https://zhongdong-stream.startvs.net',
          Host: 'zhongdong-stream.startvs.net'
        }
      },
      // 添加字幕文件的代理
      '/subtitle': {
        target: 'https://subtitle-zhongdong.s3.me-central-1.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/subtitle/, '')
      }
    }
  },
  optimizeDeps: {
    include: ['vue3-video-play']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  assetsInclude: ['**/*.vtt'],
})
