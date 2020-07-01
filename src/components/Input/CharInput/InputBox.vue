<template>
  <div class="input-box">
    <div v-if="topChar" class="top-char">{{ topChar }}</div>
    <div
      :class="['char-input', isAction && !disabled ? 'div-action' : 'div-no-action']"
      :style="charStyle"
      @click="onDivFocus"
    >
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
      <div v-show="maxIsWrong || minIsWrong" class="wrong">{{ wrongText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Number }, // 初始值 用于v-model

    size: { type: Number, default: () => 20 }, // 字体大小

    color: { type: String, default: () => '#000' }, // 字体颜色

    topChar: { type: String }, // 框上方文字

    leftChar: { type: String }, // 框左侧文字

    rightChar: { type: String }, // 框右侧文字

    placeChar: { type: String }, // 提示文字

    wrongText: { type: String, default: () => '超出最大值或最小值，请重新填写' }, // 警告文本

    getFocus: { type: Boolean, default: () => false }, // 是否自动获取焦点

    hasNegative: { type: Boolean, default: () => false }, // 是否要负数

    maxDigit: { type: Number, default: () => 6 }, // 最大小数位

    hasDigit: { type: Boolean, default: () => true }, // 是否要小数 (如果为 false,会无视 maxDigit)

    step: { type: Number }, // 加减步数 设置了则自带上下标签

    max: { type: Number, default: () => 100000000 }, // 强制最大值

    min: { type: Number }, // 强制最小值

    wrongMax: { type: Number }, // 最大值警告 （和 max 相斥）需要通过 ref拿 maxIsWrong 判断是否警告

    wrongMin: { type: Number }, // 最小值警告 （和 min 相斥）需要通过 ref拿 minIsWrong 判断是否警告

    disabled: { type: Boolean, default: () => false } // 是否禁止输入框
  },
  data () {
    return {
      inputData: 0,
      lastInputData: 0, // 上一次输入框的值
      isAction: this.getFocus,
      maxIsWrong: false,
      minIsWrong: false
    }
  },
  computed: {
    // 最外层 div添加 style
    charStyle () {
      const fontSize = `font-size:${this.size}px;`
      const color = `color:${this.color};`
      const border =
        (this.maxIsWrong || this.minIsWrong)
          ? 'border: 1px solid red;'
          : ''
      return fontSize + color + border
    },
    // input 添加 style
    inputStyle () {
      const fontSize = `font-size:${this.size}px;`
      const color = `color:${this.color};`
      return fontSize + color
    },
    // 正则匹配
    regs () {
      if (this.hasNegative && this.hasDigit) {
        return new RegExp('^\\-?\\d{0,}\\.?\\d{0,' + this.maxDigit + '}$', 'g')
      } else if (this.hasNegative) {
        return new RegExp('^\\-?\\d{0,}$', 'g')
      } else if (this.hasDigit) {
        return new RegExp('^\\d{0,}\\.?\\d{0,' + this.maxDigit + '}$', 'g')
      } else {
        return new RegExp('^\\d{0,}$', 'g')
      }
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
      if (!e.target.value) {
        this.$emit('input', 0)
        return
      }
      const reg = e.target.value.match(this.regs)
      if (reg) {
        this.inputData = reg[0]
        this.maxIsWrong = this.wrongMax && this.inputData > this.wrongMax // 判断是否大于警告的最大值
        this.minIsWrong = this.wrongMin && this.inputData < this.wrongMin // 判断是否小于于警告的最小值

        if (this.max && this.inputData > this.max) { // 判断是否大于最大值
          this.inputData = this.lastInputData
          return
        }
        if (this.min && this.inputData < this.min) { // 判断是否小于最小值
          this.inputData = this.lastInputData
          return
        }

        this.lastInputData = this.inputData
        this.inputData && this.inputData !== '-' && this.$emit('input', parseFloat(this.inputData))
      } else {
        this.inputData = this.value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-box {
  .top-char {
    margin-bottom: 15px;
  }
  .char-input {
    display: flex;
    align-items: baseline;
    position: relative;
    width: 100%;
    color: black;
    border-radius: 6px;
    padding: 0 5px;

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

    .wrong {
      position: absolute;
      top: 100%;
      left: 10px;
      z-index: 200;
      color: red;
      font-size: 14px;
      margin-top: 6px;
    }
  }
}
.div-action {
  border: 1px solid #0c49c0;
}
.div-no-action {
  border: 1px solid #999;
}
</style>
