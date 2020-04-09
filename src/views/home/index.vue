<template>
  <div class="home">
    <loop :value="val" />
  </div>
</template>

<script>
import Loop from '../../components/Loop'

export default {
  data () {
    return {
      val: ['我是周杰伦', '我是藤原某某', '我是周星驰']
    }
  },
  created () {
    // console.log(this.$route.params)
    // console.log(this.$route.query)
  },
  components: {
    Loop
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 500px;
  font-size: 90px;
  border: 1px solid red;
  .loop {
    position: relative;
    top: 50%;
    margin: 0 auto;
  }
}
</style>
