<template>
  <div class="left">aaa</div>
</template>

<script>
export default {
  created () {
    throw new Error('yy')
  }
}
</script>

<style lang="scss" scoped>
.left {
  width: 100%;
  height: 500px;
  background-color: green;
}
</style>
