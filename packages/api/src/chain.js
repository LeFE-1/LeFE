export const getByChain = function (data, keyString) {
  if (keyString === undefined) return undefined
  const keys = typeof keyString === 'string' ? keyString.split('.') : keyString
  if (!keys.length) return undefined
  if (data[keys[0]] === undefined || data[keys[0]] === null)
    return data[keys[0]]

  let result = data
  keys.forEach(key => {
    if (result === undefined) return
    result = result[key]
  })
  return result
}

export const traversal = function (node, callback) {
  callback(node)
  node.children &&
    node.children.forEach(child => {
      traversal(child, callback)
    })
}
