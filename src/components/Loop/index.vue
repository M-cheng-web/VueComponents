<template>
  <div class="loop">
    <div v-for="(item, index) in _val" :key="index">{{ item }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Array }, // 需要循环展示的数据

    direction: { type: String, default: 'x' }, // 循环方向  x/y

    runTime: { type: Number, default: 2 }, // 数据切换时间

    stopTime: { type: Number, default: 2 } // 数据停留页面时间
  },
  computed: {
    _val () {
      return this.value
    }
  }
}
</script>

<style lang="scss" scoped>
.loop {
  display: flex;
  align-items: center;
  width: 500px;
  height: 40px;
  font-size: 20px;
  border: 1px solid red;
  padding-left: 10px;
}
</style>
