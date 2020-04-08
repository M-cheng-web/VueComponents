<template>
  <div class="action-input">
    <button @click="minus" />
    <input
      v-focus="getFocus"
      v-model="inputData"
      @input="onInput($event)"
      @focus="onFocus"
      @blur="onBlur" />
    <button @click="add" />
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Number }, // 初始值 用于v-model

    step: { type: Number }, // 设置加减步数 格式为 0.01 不设置则跟随用户输入自动加减

    max: { type: Number }, // 设置最大值  不设置则无最大值

    min: { type: Number, default: 0 }, // 设置最小值  默认最小 0

    getFocus: { type: Boolean, default: false }, // 是否自动获取焦点

    onFocusClear: { type: Boolean, default: false }, // 获取焦点时 设置输入框内值为0 默认为 false

    onBlurClear: { type: Boolean, default: false } // 失去焦点时 设置输入框内值为0 默认为 false
  },
  data () {
    return {
      inputData: 0
    }
  },
  computed: {
    // 记录用户输入的数值的小数位数 返回 1 0.1 0.01 格式 为了方便运算
    digit () {
      if (!this.step) {
        var len
        try {
          len = this.value.toString().split('.')[1].length
        } catch (error) { len = 0 }
        return this.getDigitNum(len)
      }
      return 1
    }
  },
  watch: {
    value: {
      handler (val) {
        this.inputData = val
      },
      immediate: true
    }
  },
  directives: {
    focus: {
      inserted (el, { value }) {
        value && el.focus()
      }
    }
  },
  methods: {
    // 减
    minus () {
      if (this.inputData === this.min) {
        return
      }
      this.inputData = this.floatMinus(this.inputData, this.step || this.digit)
      this.$emit('input', this.inputData)
    },
    // 加
    add () {
      if (this.max && this.inputData === this.max) {
        return
      }
      this.inputData = parseFloat(this.inputData)
      this.inputData = this.floatAdd(this.inputData, this.step || this.digit)
      this.$emit('input', this.inputData)
    },
    // 输入框输入
    onInput (e) {
      this.$emit('input', parseFloat(e.target.value))
    },
    // 获取焦点事件
    onFocus () {
      this.onFocusClear && this.getFocus && this.$emit('input', 0)
    },
    // 失去焦点事件
    onBlur () {
      this.onBlurClear && this.$emit('input', 0)
    },
    // 得到用户手动输入的数值有几位小数后
    // 返回对应的小数 1 返回 0.1  2 返回 0.2
    getDigitNum (len) {
      let digitNum
      if (len === 0) {
        return 1
      } else if (len === 1) {
        return 0.1
      } else {
        digitNum = '0.'
        while (len > 1) {
          digitNum += '0'
          len--
        }
        digitNum += '1'
        return parseFloat(digitNum)
      }
    },

    // ---------------------------解决丢失精度问题---------------------------------
    /**
     * 两个数相加
     */
    floatAdd (a, b) {
      var c, d, e
      if (!a) {
        a = 0
      }
      if (!b) {
        b = 0
      }
      try {
        c = a.toString().split('.')[1].length
      } catch (f) {
        c = 0
      }
      try {
        d = b.toString().split('.')[1].length
      } catch (f) {
        d = 0
      }
      e = Math.pow(10, Math.max(c, d))
      return (this.floatMul(a, e) + this.floatMul(b, e)) / e
    },
    /**
     * 两个数相减
     */
    floatMinus (a, b) {
      var c, d, e

      if (!a) {
        a = 0
      }
      if (!b) {
        b = 0
      }
      try {
        c = a.toString().split('.')[1].length
      } catch (f) {
        c = 0
      }
      try {
        d = b.toString().split('.')[1].length
      } catch (f) {
        d = 0
      }
      e = Math.pow(10, Math.max(c, d))
      return (this.floatMul(a, e) - this.floatMul(b, e)) / e
    },
    /**
     * 两个数相乘
     */
    floatMul (a, b) {
      var c, d, e
      c = 0
      d = a.toString()
      e = b.toString()

      try {
        c += d.split('.')[1].length
      } catch (f) { }
      try {
        c += e.split('.')[1].length
      } catch (f) { }
      return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
    },
    /**
     * 两个数相除
     */
    floatDiv (a, b) {
      var c, d, e, f
      e = 0
      f = 0

      try {
        e = a.toString().split('.')[1].length
      } catch (g) {}
      try {
        f = b.toString().split('.')[1].length
      } catch (g) {}
      // return c = Number(a.toString().replace('.', '')), d = Number(b.toString().replace('.', '')), floatMul(c / d, Math.pow(10, f - e))
      c = Number(a.toString().replace('.', ''))
      d = Number(b.toString().replace('.', ''))
      return this.floatMul(c / d, Math.pow(10, f - e))
    }
  }
}
</script>

<style lang="scss" scoped>
.action-input {
  display: flex;
  align-items: center;
  width: 300px;
  font-size: 20px;
  color: black;

  input {
    flex: 1;
    margin: 0 12px;
    text-align: center;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;

    &::before {
      content: "";
      height: 2px;
      width: 12px;
      background-color: #000;
    }

    &:last-child {
      &::after {
        content: "";
        height: 2px;
        width: 12px;
        background-color: #000;
        position: absolute;
        transform: rotate(90deg);
      }
    }
  }

  input,
  button {
    background-color: #f8f8ff;
    border: 1px solid black;
    height: 30px;
  }
}
</style>
