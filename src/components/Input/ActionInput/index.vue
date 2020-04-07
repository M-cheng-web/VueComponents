<template>
  <div class="action-input">
    <button @click="minus" />
    <input v-model="value" @input="onInput(event)" >
    <button @click="add" />
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Number }, // 初始值 用于v-model

    step: { type: Number, default: 2 }, // 设置加减步数 默认为 0.01

    max: { type: Number }, // 设置最大值  不设置则无最大值

    min: { type: Number, default: 0 }, // 设置最小值  默认最小 0

    onClear: { type: Boolean, default: false } // 获取焦点时清空输入框内值 默认为 false
  },
  data () {
    return {
      inputData: 0
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
  methods: {
    // 减
    minus () {
      this.inputData -= 1
      this.$emit('input', this.inputData)
    },
    // 加
    add () {
      this.inputData = parseFloat(this.inputData)
      this.inputData += 1
      this.$emit('input', this.inputData)
    },
    onInput (e) {
      console.log(111)
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
      content: '';
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
    background-color:#F8F8FF;
    border: 1px solid black;
    height: 30px;
  }
}
</style>
