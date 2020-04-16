<template>
  <div class="home"></div>
</template>

<script>
import './jsWork.js'

export default {
  data () {
    return {
      val: [
        '九月九日忆山东兄弟', '静夜思', '古朗月行', '望庐山瀑布', '赠汪伦',
        '黄鹤楼送孟浩然之广陵', '早发白帝城', '望天门山', '别董大', '绝句',
        '春夜喜雨', '绝句', '江畔独步寻花', '游子吟', '江雪'
      ],
      // sss: [
      //   { a: 1, b: 2 },
      //   { a: 3, b: 4 },
      //   { a: 5, b: 6 }
      // ]
      sss: [
        1, 2, 3
      ],
      yyy: { a: 1, b: 2 }
    }
  },

  created () {
    // console.log(this.$route.params)
    // console.log(this.$route.query)
  },

  async mounted () {
    await this.$nextTick()
    // DOM更新后执行的方法
  },

  methods: {
    cl (val) {
      console.log(val)
    },

    onVal (index) {
      console.log(this.val1[index])
    },
    onKeyup () {
      this.$set(this.str, 2, 30)
      this.$set(this.arr, 'a', 2)
      // throw new Error('xxx')
      // this.sss[2] = 30
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 500px;
  font-size: 20px;
  border: 1px solid red;
  * {
    position: relative;
    top: 50%;
    margin: 0 auto;
    margin-bottom: 10px;
  }
}
</style>
