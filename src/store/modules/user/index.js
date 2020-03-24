var state = {
  userName: 'cheng'
}
var getters = {
  firstName (state) {
    return state.userName.slice(0, 1)
  }
}
var mutations = {
  add (state, add) {
    state.userName += add
  }
}
var actions = {
  addAct (content, add) {
    content.commit('add', add)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
