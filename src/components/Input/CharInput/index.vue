<template>
  <div :class="['char-input', isAction ? 'div-action' : 'div-no-action']" :style="charStyle" @click="onDivFocus">
    <div v-if="leftChar">{{ leftChar }}</div>
    <input
      ref="_input"
      v-focus="getFocus"
      v-model="inputData"
      :placeholder="placeChar"
      :disabled="disabled"
      :style="inputStyle"
      :type="step ? 'number' : 'text'"
      :step="step"
      @input="onInput($event)"
      @blur="onDivBlur"
    />
    <div v-if="rightChar">{{ rightChar }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Number }, // 初始值 用于v-model

    size: { type: Number, default: 20 }, // 字体大小

    color: { type: String, default: '#747d8c' }, // 字体颜色

    leftChar: { type: String }, // 框左侧文字

    rightChar: { type: String }, // 框右侧文字

    placeChar: { type: String }, // 提示文字

    step: { type: Number }, // 设置加减步数 设置了则自带上下标签

    max: { type: Number }, // 设置最大值  不设置则无最大值

    min: { type: Number }, // 设置最小值  不设置则无最小值

    maxDigit: { type: Number, default: 6 }, // 设置最大小数位

    getFocus: { type: Boolean, default: false }, // 是否自动获取焦点

    disabled: { type: Boolean, default: false } // 禁止输入框
  },
  data () {
    return {
      inputData: 0,
      isAction: this.getFocus
    }
  },
  computed: {
    // 最外层 div添加 style
    charStyle () {
      const fontSize = `font-size:${this.size}px;`
      const color = `color:${this.color};`
      return fontSize + color
    },
    // input 添加 style
    inputStyle () {
      const fontSize = `font-size:${this.size}px;`
      const color = `color:${this.color};`
      return fontSize + color
    }
  },
  watch: {
    value: {
      handler (val) {
        val === 0
          ? this.inputData = ''
          : this.inputData = val
      },
      immediate: true
    }
  },
  directives: {
    focus: {
      inserted (el, { value }) {
        value
          ? el.focus()
          : el.blur()
      }
    }
  },
  methods: {
    // div 获取焦点
    onDivFocus () {
      this.$refs._input.focus()
      this.isAction = true
    },
    // div 失去焦点
    onDivBlur () {
      this.isAction = false
    },
    // 输入框输入
    onInput (e) {
      var regs = new RegExp('^\\-?\\d{0,}\\.?\\d{0,' + this.maxDigit + '}$', 'g')
      const reg = e.target.value.match(regs)
      if (reg) {
        this.inputData = reg[0]
        if (this.max && this.inputData > this.max) { // 判断是否大于最大值
          this.inputData = this.max
          return
        }
        if (this.min && this.inputData < this.min) { // 判断是否小于最小值
          this.inputData = this.min
          return
        }
        this.inputData && this.inputData !== '-' && this.$emit('input', parseFloat(this.inputData))
      } else {
        this.inputData = this.value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.char-input {
  display: flex;
  align-items: baseline;
  width: 400px;
  color: black;
  border-radius: 6px;
  padding-left: 5px;

  input {
    flex: 1;
    height: 40px;
    outline: none;
    border: 0;
    margin: 0 15px;
  }
  input:disabled {
    background-color: #fff;
  }
}
.div-action {
  background-color: #fff;
  border: 1px solid #0c49c0;
}
.div-no-action {
  border: 1px solid #999;
}
</style>
