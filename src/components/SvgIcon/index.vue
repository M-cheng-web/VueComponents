<template>
  <svg aria-hidden="true" :style="svgStyle" :class="iconClass">
    <use :xlink:href="svgName" />
  </svg>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    name: { type: String, default: '' }, // 图标名
    size: { type: String }, // 图标尺寸
    color: { type: String }, // 图标颜色
    custom: { type: Boolean, default: false } // 是否自定义
  },
  computed: {
    // svg图标id
    svgName () {
      return `#icon-${this.name}`
    },
    // svg样式
    svgStyle () {
      const color = this.color ? `color:${this.color};` : ''
      const size = this.size ? `font-size:${this.size}px;` : ''
      return color + size
    },
    // 图标类
    iconClass () {
      return this.custom ? '' : 'svg-icon'
    }
  }
}
</script>
<style lang='scss' scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}
</style>
