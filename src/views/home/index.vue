<template>
  <div class="home">
    <char-input v-model="val" placeChar="请输入价格" />
  </div>
</template>

<script>
// import ActionInput from '../../components/Input/ActionInput'
import CharInput from '../../components/Input/CharInput'

export default {
  data () {
    return {
      val: 0
    }
  },
  created () {
    // console.log(this.$route.params)
    // console.log(this.$route.query)
  },
  components: {
    // ActionInput,
    CharInput
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 500px;
  font-size: 90px;
  border: 1px solid red;
  .char-input {
    position: relative;
    top: 50%;
    margin: 0 auto;
  }
}
</style>
