export default {
  add (state) {
    state.page += 1
  },
  minus (state) {
    state.page = state.page - 1
  },
  num (state, num) {
    state.page = num
  }
}
