<template>
  <div class="home">
    <action-input v-model="val" onFocusClear getFocus />
  </div>
</template>

<script>
import ActionInput from '../../components/Input/ActionInput'

export default {
  data () {
    return {
      val: 10
    }
  },
  created () {
    // console.log(this.$route.params)
    // console.log(this.$route.query)
  },
  components: {
    ActionInput
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 500px;
  font-size: 90px;
  border: 1px solid red;
  .action-input {
    position: relative;
    top: 50%;
    margin: 0 auto;
  }
}
</style>
