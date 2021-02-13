const { md5 } = require('./md5')

export const template = function (tpl, data) {
  let tplString = tpl
  const keys = []
  const arr = tplString.match(/\$\{(.*?)\}/g)
  for (let key in arr) {
    const s = arr[key].replace('${', '').replace('}', '')
    keys.push(s)
  }
  keys.forEach(key => {
    tplString = tplString.replace('${' + key + '}', getByChain(data, key))
  })
  return tplString
}

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

export const createChain = function (state, key, value) {
  if (key.includes('${')) return
  if (!key.includes('.')) {
    state[key] = value
    return
  }
  const keys = key.split('.')
  let next = state
  keys.forEach((key, keyIndex) => {
    if (keyIndex < keys.length - 1) {
      const nextKey = keys[keyIndex + 1]
      next[key] =
        next[key] ||
        (nextKey.match(/\d/)
          ? Array.from({ length: parseInt(nextKey) }).map((value, index) => {
              return next[key] ? next[key][index] : {}
            })
          : {})
      next = next[key]
      if (next instanceof Array && !nextKey.match(/\d/)) {
        console.error(
          `this state will not run correctly, you are setting Attribute [${nextKey}] into an Array`
        )
      }
    } else {
      if (next instanceof Array && !key.match(/\d/)) {
        console.error(
          `this state will not run correctly, you are setting Attribute [${key}] into an Array`
        )
      }
      next[key] = next[key] || value
    }
  })
}

const createState = function (state, nodeState) {
  if (nodeState instanceof Array) {
    createChain(state, nodeState[0], nodeState[1])
  } else {
    createChain(state, nodeState, getByChain(state, nodeState))
  }
}

export const getDerivedState = function (state, node) {
  node.id = node.id || md5(JSON.stringify(node) + Math.random())

  if (node.state) createState(state, node.state)
  if (node.dataSource && node.dataSource.state)
    createState(state, node.dataSource.state)

  if (node.loop && node.loop instanceof Array) {
    node.loop.forEach(child => {
      getDerivedState(state, child)
    })
  }
  node.children &&
    node.children.forEach(child => {
      getDerivedState(state, child)
    })
}
