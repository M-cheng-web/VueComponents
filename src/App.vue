<template>
  <div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  data () {
    return {
      a: 'app',
      b: 'app'
    }
  },
  computed: {
    aa () {
      return this.a
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0
}
</style>
