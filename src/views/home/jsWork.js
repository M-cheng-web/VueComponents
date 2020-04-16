// var target = {}
// var handler = {}
// var proxy = new Proxy(target, handler)
// proxy.name = 'haha'
// console.log(target.name) // haha

var proxy = new Proxy([1, 2, 3], {
  get (target, key) {
    console.log(this)
    return target[key]
  },
  set (target, key, value) {
    if (key === 'name') {
      target[key] = value - 1
    }
  }
})

// proxy.name = 100
console.log(proxy[2]) // 2
