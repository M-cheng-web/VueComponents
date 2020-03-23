const requireContext = require.context('./', false, /\.js$/)
const apis = requireContext.keys().reduce((total, item) => {
  const name = item.slice(2, -3)
  if (name === 'index') return total
  total[name] = { ...requireContext(item) }
  return total
}, {})

export default apis
