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
      '@': path.resolve(__dirname, 'src')
    }
  },
 
})
