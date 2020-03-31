<template>
  <div class="home">
    {{ $route.params.id }}
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$route.params)
    console.log(this.$route.query)
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 500px;
  background-color: red;
  font-size: 90px;
}
</style>
