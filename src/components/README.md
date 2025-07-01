# AdComponent 广告组件使用指南

## 基本用法

AdComponent 是一个用于显示 Google AdSense 广告的 Vue 组件。您可以在任何需要展示广告的地方使用它。

### 简单使用

```vue
<template>
  <div>
    <!-- 其他内容 -->
    <AdComponent />
    <!-- 其他内容 -->
  </div>
</template>

<script>
import AdComponent from '@/components/AdComponent.vue'

export default {
  components: {
    AdComponent
  }
}
</script>
```

### 在 Vue 3 组合式 API 中使用

```vue
<template>
  <div>
    <!-- 其他内容 -->
    <AdComponent />
    <!-- 其他内容 -->
  </div>
</template>

<script setup>
import AdComponent from '@/components/AdComponent.vue'
</script>
```

## 高级用法

您可以通过传递不同的 props 来自定义广告的显示方式：

```vue
<template>
  <AdComponent 
    adSlot="1234567890"
    adFormat="rectangle" 
    :containerStyle="{ margin: '10px 0', padding: '5px', background: '#f5f5f5' }"
    adStyle="display:inline-block;width:300px;height:250px"
  />
</template>
```

## 可用属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| adSlot | String | '3624122999' | 广告位 ID |
| adFormat | String | 'auto' | 广告格式 |
| fullWidthResponsive | String | 'true' | 是否全宽响应式 |
| containerStyle | Object | {} | 容器样式 |
| adStyle | String | 'display:block' | 广告样式 |

## 常见广告位置

- 在内容之间：放在文章或内容的中间
- 在侧边栏：作为侧边栏的一部分
- 在页脚：放在页面底部
- 在页面顶部：放在页面顶部的横幅位置

## 注意事项

1. 确保在 `index.html` 中已添加 Google AdSense 脚本
2. 不要在同一页面放置过多广告，以免影响用户体验
3. 广告加载可能需要一些时间，请确保您的布局在广告加载前后都能正常显示
4. 遵循 Google AdSense 政策，不要点击自己的广告或鼓励用户点击广告 