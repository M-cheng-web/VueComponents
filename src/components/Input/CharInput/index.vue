<template>
  <div class="char-input" :style="charStyle" @click="onDivFocus">
    <div v-if="leftChar">{{ leftChar }}</div>
    <input
      ref="_input"
      v-focus="getFocus"
      v-model="inputData"
      :placeholder="placeChar"
      :type="labelInput ? 'number' : 'text'"
      :disabled="disabled"
      @input="onInput($event)"
      @focus="onFocus"
    />
    <div v-if="rightChar">{{ rightChar }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Number }, // 初始值 用于v-model

    font: { type: Number, default: 24 }, // 字体大小

    leftChar: { type: String }, // 框左侧文字

    rightChar: { type: String }, // 框右侧文字

    placeChar: { type: String }, // 提示文字

    step: { type: Number, default: 1 }, // 设置加减步数

    max: { type: Number }, // 设置最大值  不设置则无最大值

    min: { type: Number }, // 设置最小值  不设置则无最小值

    maxDigit: { type: Number, default: 6 }, // 设置最大小数位

    getFocus: { type: Boolean, default: false }, // 是否自动获取焦点

    onFocusClear: { type: Boolean, default: false }, // 获取焦点时 设置输入框内值为 0

    disabled: { type: Boolean, default: false }, // 禁止输入框

    labelInput: { type: Boolean, default: false } // 使用带上下标签的输入框
  },
  data () {
    return {
      inputData: 0,
      thisGetFocus: false
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
        val === 0
          ? this.inputData = ''
          : this.inputData = val
      },
      immediate: true
    },
    getFocus: {
      // 绑定 getFocus 实现第一次不清零效果
      handler (val) {
        this.thisGetFocus = val
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
    // 点击 div 更改input为选中状态
    onDivFocus () {
      this.$refs._input.focus()
    },
    // 最外层 div添加 style
    charStyle () {
      const fontSize = `font-size:${this.font}px;`
      return fontSize
    },

    // 减
    minus () {
      let minusData = this.inputData ? this.inputData : 0
      if (minusData === this.min) {
        return
      }
      minusData = this.floatMinus(minusData, this.step || this.digit)
      this.$emit('input', minusData)
    },
    // 加
    add () {
      let addData = this.inputData ? parseFloat(this.inputData) : 0
      if (this.max && addData === this.max) {
        return
      }
      addData = this.floatAdd(addData, this.step || this.digit)
      this.$emit('input', addData)
    },
    // 输入框输入
    onInput (e) {
      var regs = new RegExp('^\\-?\\d{0,}\\.?\\d{0,' + this.maxDigit + '}$', 'g')
      const reg = e.target.value.match(regs)
      console.log(reg)
      if (reg) {
        this.inputData = reg[0] || 0
        if (this.max && this.inputData > this.max) { // 判断是否大于最大值
          this.inputData = this.max
          return
        }
        if (this.inputData < this.min) { // 判断是否小于最小值
          this.inputData = this.min
          return
        }
        this.inputData !== '-' && this.$emit('input', parseFloat(this.inputData))
      } else {
        this.inputData = this.value
      }
    },
    // 获取焦点事件
    onFocus () {
      this.thisGetFocus
        ? this.thisGetFocus = false
        : this.onFocusClear && this.$emit('input', 0)
    },
    // 得到用户手动输入的数值有几位小数后
    // 返回对应的小数 1 返回 0.1  2 返回 0.01
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

    // ------------------------ 解决丢失精度问题 （只能到11位）------------------------------
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
      } catch (g) { }
      try {
        f = b.toString().split('.')[1].length
      } catch (g) { }
      // return c = Number(a.toString().replace('.', '')), d = Number(b.toString().replace('.', '')), floatMul(c / d, Math.pow(10, f - e))
      c = Number(a.toString().replace('.', ''))
      d = Number(b.toString().replace('.', ''))
      return this.floatMul(c / d, Math.pow(10, f - e))
    },

    // ------------------------ 解决科学计数法显示问题(未完成，有bug) ------------------------------

    // 不支持输入 0. 的情况， 在调用之前要先判断
    // 只能处理 0.1111122346533665 或者
    // 121654531321654313  这样的
    toNonExponential (num) {
      const newNumber = parseFloat(num)
      if (Number.isNaN(newNumber)) {
        throw new TypeError('params of toNonExponential must be numeric')
      }
      if (newNumber === 0) {
        return newNumber
      }
      // const digitsReg = /\de[\\+|\\-](\d+)/g // 位数正则
      // const numberReg = /(\d\.?\d*)e[\\+,\\-]/g // 数值正则
      const digitsReg = new RegExp('\\de[\\+|\\-](\\d+)', 'g')
      const numberReg = new RegExp('(\\d\\.?\\d*)e[\\+,\\-]', 'g')
      const digits = digitsReg.exec(newNumber.toExponential())[1]
      const number = numberReg.exec(newNumber.toExponential())[1].split('.').join('')

      console.log(digits, number)

      const isFloat = newNumber < 1
      const symbol = newNumber < 0 ? '-' : ''
      if (isFloat) {
        return `${symbol}0.${this.getZeroString(digits - 1)}${number}`
      } else {
        return `${symbol}${number}${this.getZeroString(digits - number.length + 1)}`
      }
    },
    getZeroString (number) {
      return number ? new Array(number).fill(0).join('') : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.char-input {
  display: flex;
  align-items: center;
  width: 400px;
  color: black;
  border: 1px solid #747d8c;

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
