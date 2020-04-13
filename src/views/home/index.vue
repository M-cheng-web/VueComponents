<template>
  <div class="home">
    <button @keyup.f2="onKeyup(1)">aaaa</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      val: [
        '九月九日忆山东兄弟', '静夜思', '古朗月行', '望庐山瀑布', '赠汪伦',
        '黄鹤楼送孟浩然之广陵', '早发白帝城', '望天门山', '别董大', '绝句',
        '春夜喜雨', '绝句', '江畔独步寻花', '游子吟', '江雪'
      ]
    }
  },

  created () {
    // console.log(this.$route.params)
    // console.log(this.$route.query)
    // throw new Error('xxx')
  },

  methods: {
    onVal (index) {
      console.log(this.val1[index])
    },
    onKeyup (val) {
      console.log(val)
    }
  },

  components: {
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 500px;
  font-size: 90px;
  border: 1px solid red;
  * {
    position: relative;
    top: 50%;
    margin: 0 auto;
    margin-bottom: 10px;
  }
}
</style>
