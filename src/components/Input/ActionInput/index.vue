<template>
  <view class="action-input">
    <button @click="minus" />
    <input
      type="number"
      v-model="inputData"
      @input="onInput($event)"
      @focus="onFocus"
      :placeholder="String(placeholder)"
    />
    <button @click="add" />
  </view>
</template>

<script>
export default {
  props: {
    value: { type: Number }, // 初始值 用于v-model

    placeholder: { type: Number, default: () => 0 }, // placeholder

    step: { type: Number }, // 设置加减步数 格式为 0.01 不设置则跟随用户输入自动加减

    max: { type: Number }, // 设置最大值  不设置则无最大值

    min: { type: Number }, // 设置最小值  不设置则无最小值

    maxDigit: { type: Number, default: 6 }, // 设置最大小数位 默认 4位

    onFocusClear: { type: Boolean, default: false }, // 获取焦点时 设置输入框内值为0 默认为 false

    onButtSetHolder: { type: Boolean, default: false }, // 点击 button时 placeholder的值自动赋值给 v-model 且+1
  },
  data () {
    return {
      inputData: 0, // 输入框显示值
      thisGetFocus: false, // input是否获取焦点
      isSetHolder: true // 是否要在点击 + / - 后将 placeholder的值赋值给 v-model再进行加减
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
          ? this.inputData = undefined
          : this.inputData = val
      },
      immediate: true
    }
  },
  methods: {
    // 减
    minus () {
      let minusData = this.inputData ? this.inputData : 0

      if (this.onButtSetHolder && this.isSetHolder) {
        let len = this.getDigitNum(this.placeholder.toString().split('.')[1].length) // 需要 + / - 的步数 ps:0.01
        minusData = this.floatMinus(this.placeholder, len)
        this.isSetHolder = false
      } else {
        if (minusData === this.min) return
        minusData = this.floatMinus(minusData, this.step || this.digit)
      }

      this.$emit('input', minusData)
    },
    // 加
    add () {
      let addData = this.inputData ? parseFloat(this.inputData) : 0

      if (this.onButtSetHolder && this.isSetHolder) {
        let len = this.getDigitNum(this.placeholder.toString().split('.')[1].length) // 需要 + / - 的步数 ps:0.01
        addData = this.floatAdd(this.placeholder, len)
        this.isSetHolder = false
      } else {
        if (this.max && addData === this.max) return
        addData = this.floatAdd(addData, this.step || this.digit)
      }

      this.$emit('input', addData)
    },
    // 输入框输入
    onInput (e) {
      this.isSetHolder = false // 输入框输入了再点击 + / - 就不会再将 placeholder赋值
      var regs = new RegExp('^\\-?\\d{0,}\\.?\\d{0,' + this.maxDigit + '}$', 'g')
      const reg = e.target.value.match(regs)
      if (reg) {
        this.inputData = reg[0] || 0
        if (this.max && this.inputData > this.max) { // 判断是否大于最大值
          this.inputData = this.max
          return
        }
        if (this.min && this.inputData < this.min) { // 判断是否小于最小值
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
.action-input {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #fff;

  input {
    flex: 1;
    margin: 0 24rpx;
    text-align: center;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60rpx;
    position: relative;
    padding: 0;

    &::before {
      content: "";
      height: 4rpx;
      width: 24rpx;
      background-color: #fff;
    }

    &:last-child {
      &::after {
        content: "";
        height: 4rpx;
        width: 24rpx;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: rotate(90deg) translate(-50%, -50%);
      }
    }
  }

  input,
  button {
    background-color: transparent;
    border: 1rpx solid #fff;
    height: 60rpx;
  }
}
</style>
