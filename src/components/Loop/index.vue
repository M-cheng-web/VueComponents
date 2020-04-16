<template>
  <div class="loop" :style="loopStyle">
    <div :class="direction === 'x' ? 'content-x' : 'content-y'" :style="divMoveStyle">
      <div v-for="(item, index) in _val" :key="index" :style="textStyle" @click="onContent(index)">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    value: { type: Array }, // 需要循环展示的数据

    direction: { type: String, default: 'x' }, // 循环方向  x/y

    runTime: { type: Number, default: 1 }, // 数据切换时间

    stopTime: { type: Number, default: 3 }, // 数据停留页面时间

    size: { type: Number, default: 20 }, // 字体大小

    width: { type: Number, default: 500 }, // 长度

    height: { type: Number, default: 40 }, // 高度

    bgc: { type: String, default: '#b2bec3' } // 背景色
  },

  data () {
    return {
      toRun: false
    }
  },

  computed: {
    _val () {
      if (this.value) {
        return this.value
      } else {
        throw new Error('Loop Please pass in the correct parameters')
      }
    },
    // 滑动时触发的动画
    divMoveStyle () {
      // 设置 向上/向左 移动的长度
      const marginLeft = this.direction === 'x' ? `margin-left: -${this.width}px;` : `margin-top: -${this.height}px;`

      // 设置移动时间
      const transition = `transition: ${this.runTime}s;`

      // 设置 y轴移动时高度为 height * 数组长度
      const contentYStyle = this.direction === 'y' ? `height: ${this.height * this._val.length}px;` : ''

      return this._val.length > 1 && this.toRun ? marginLeft + transition + contentYStyle : contentYStyle
    },
    // 最外侧 div 样式
    loopStyle () {
      const width = `width: ${this.width}px;`
      const height = `height: ${this.height}px;`
      const size = `font-size: ${this.size}px;`
      const bgc = `background-color: ${this.bgc}`
      return width + height + size + bgc
    },
    // 最内层 div 样式
    textStyle () {
      const width = `width: ${this.width}px;`
      return width
    }
  },

  created () {
    setInterval(this.resetVal, this.stopTime * 1000)
  },

  methods: {
    resetVal () {
      this.toRun = true
      setTimeout(() => {
        this._val.push(this._val[0])
        this._val.shift()
        this.toRun = false
      }, this.runTime * 1000)
    },

    onContent (index) {
      this.$emit('onVal', index) // 传给父级下标
    }
  }
}
</script>

<style lang="scss" scoped>
.loop {
  position: relative; // 设置定位是为了让子级的宽度能超出父级
  border-radius: 16px;
  overflow: hidden;

  .content-x {
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
  }

  .content-y {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
