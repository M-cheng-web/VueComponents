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
      a: 'app'
    }
  },
  computed: {
    aa () {
      console.log(11);
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
