export default {
  addAct (content) {
    content.commit('add')
  },
  minusAct (content) {
    content.commit('minus')
  },
  numAct (content, num) {
    content.commit('num', num)
  }
}
