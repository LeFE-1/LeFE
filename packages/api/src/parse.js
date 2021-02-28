import { getByChain } from './chain'

export const template = function (tpl, data) {
  if (!tpl.includes('${')) return tpl
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

export const render = (key, data) => {
  if (!key) return ''
  if (typeof key === 'function') return key(data)
  return template(key, data)
}

export const parseValueWithData = (key, data) =>
  getByChain(data, render(key, data))

export const parseValue = (value, data, defaultValue) => {
  if (value === undefined) return defaultValue
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') return parseValueWithData(value, data)
  if (typeof value === 'function') return value(data)
  return defaultValue
}

export const parseProps = (pProps, data = {}) => {
  if (!pProps) return {}
  const p = {}
  // 处理'-'到驼峰
  Object.keys(pProps).forEach(key => {
    const LeFEIndex = key.indexOf('_LeFE')
    let value = pProps[key]
    if (LeFEIndex != -1) {
      key = key.substr(0, LeFEIndex)
      value = parseValue(value, data)
    }
    const index = key.indexOf('-')
    if (index == -1) {
      p[key] = value
    } else {
      p[
        key.slice(0, index) +
          key[index + 1].toUpperCase() +
          key.substr(index + 2)
      ] = pProps[key]
    }
  })
  return p
}
