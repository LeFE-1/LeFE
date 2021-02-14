import {
  computed,
  inject,
  ref,
  getCurrentInstance,
  onBeforeMount,
  watch
} from 'vue'
import Toolkit from 'lefe-toolkits'

const traversal = block => {
  let result = []
  if (!block.children || !block.children.length) return [block]
  block.children.forEach(child => {
    result = result.concat(traversal(child))
  })
  return result
}
const tpl = (key, data) => {
  if (!key) return ''
  if (typeof key === 'function') return key(data)
  return key.includes('${') ? Toolkit.template(key, data) : key
}
const parseValueWithData = (key, data) =>
  Toolkit.getByChain(data, tpl(key, data))
const parseValue = (value, data, defaultValue) => {
  if (value === undefined) return defaultValue
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') return parseValueWithData(value, data)
  if (typeof value === 'function') return value(data)
  return defaultValue
}

export function common(props, context, params) {
  const { defaultProps = {} } = params || {}
  const parseProps = (pProps, data = {}) => {
    if (!pProps) return {}
    const p = {}
    // 处理'-'到驼峰
    Object.keys(pProps).forEach(key => {
      const LeFEIndex = key.indexOf('_LeFE')
      let value = pProps[key]
      if (LeFEIndex != -1) {
        key = key.substr(0, LeFEIndex)
        value = parseValue(value, { ...props.store, ...data })
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

  const mergedProps = computed(() =>
    Object.assign(defaultProps, parseProps(props.props))
  )
  const vif = condition => !!parseValue(condition, props.store, true)
  // const disabled = disabled => !!parseValue(disabled, props.store, false)

  return {
    parseProps,
    mergedProps,
    tpl: key => tpl(key, props.store),
    vif,
    // disabled,
    parseValueWithData: key => parseValueWithData(key, props.store),
    parseRender: computed(() => tpl(props.render, props.store)),
    traversal
  }
}

export function state(props) {
  const eventEmitter = inject('eventEmitter')
  const stateKey = computed(() => {
    const { state } = props
    return state === undefined ? state : tpl(state, props.store)
  })
  const stateValue = ref(parseValueWithData(stateKey.value, props.store))
  watch(
    () => Toolkit.getByChain(props.store, stateKey.value),
    newValue => {
      if (newValue == stateValue.value) return
      stateValue.value = newValue
    }
  )
  return {
    state: stateKey,
    stateValue,
    change: (value, key) => {
      eventEmitter.emit(`change_${props.store.LeFE_ID}`, {
        key: key || stateKey.value,
        value
      })
    }
  }
}

export function events(props) {
  const eventEmitter = inject('eventEmitter')
  const eventLoading = ref(false)
  const getMethod = method => (method instanceof Array ? method : [method, {}])
  const trigger = eventName => {
    const { events, store } = props
    if (!events || !events[eventName]) return false
    const [method, params] = getMethod(events[eventName])
    eventLoading.value = true
    new Promise((resolve, reject) => {
      eventEmitter.emit(`trigger_${store.LeFE_ID}`, {
        method,
        params,
        resolve,
        reject
      })
    })
      .then(() => {
        eventLoading.value = false
      })
      .catch(() => {
        eventLoading.value = false
      })
  }
  return {
    eventLoading,
    trigger
  }
}

export function dataSource(props) {
  const http = inject('http')
  const eventEmitter = inject('eventEmitter')
  const dataArray = ref([])
  const originDataArray = ref([])
  const dataSource = props.dataSource

  if (dataSource) {
    if (dataSource instanceof Array) {
      dataArray.value = dataSource
    } else if (typeof dataSource === 'string') {
      dataArray.value = parseValueWithData(dataSource, props.store)
      watch(
        () => Toolkit.getByChain(props.store, dataSource),
        newValue => {
          dataArray.value = newValue
          originDataArray.value = newValue
        }
      )
    }
    originDataArray.value = dataArray.value
  }

  const fetch = params => {
    const { store, dataSource } = props
    if (typeof dataSource !== 'object') return new Promise(resolve => resolve())
    const {
      url,
      bodyFormatter = () => ({}),
      method = 'post',
      repFormatter = rep => rep,
      state = ''
    } = dataSource

    const body = bodyFormatter({ ...store, ...params })
    // 阻止发送请求
    if (typeof body === 'boolean' && body === false)
      return new Promise(resolve => resolve(false))
    return http[method](tpl(url, props.store), body).then(rep => {
      const repFormat = repFormatter(rep, body, store)
      if (state) {
        eventEmitter.emit(`change_${props.store.LeFE_ID}`, {
          key: tpl(state, props.store),
          value: repFormat instanceof Array ? repFormat : repFormat.data
        })
      }
      return repFormat
    })
  }
  onBeforeMount(() => {
    if (props.dataSource && props.dataSource.immediate) {
      fetch().then(data => {
        dataArray.value = data
      })
    }
  })
  return {
    dataArray,
    originDataArray,
    fetch
  }
}

export function exportKey(props) {
  if (props.exportsKey === undefined) return
  onBeforeMount(() => {
    const eventEmitter = inject('eventEmitter')
    const internalInstance = getCurrentInstance()
    const key = tpl(props.exportsKey, props.store) + '_' + props.store.LeFE_ID
    eventEmitter.removeListener(key)
    eventEmitter.addListener(
      key,
      ({ action, key, method, data, params, resolve, reject }) => {
        try {
          switch (action) {
            case 'change':
              Object.entries(data).forEach(([key, value]) => {
                if (internalInstance.data[key] === undefined) {
                  console.warn(`No ${key} defined in ${props.exportsKey}`)
                } else {
                  internalInstance.data[key] = value
                }
              })
              break
            case 'trigger':
              if (internalInstance.ctx[method] === undefined) {
                console.warn(
                  `No ${method} method defined in ${props.exportsKey}`
                )
                reject()
              } else {
                const p = internalInstance.ctx[method].call(
                  internalInstance.ctx,
                  params
                )
                if (p instanceof Promise) {
                  p.then(rep => resolve(rep)).catch(e => reject(e))
                } else {
                  resolve(p)
                }
              }
              break
            case 'get':
              resolve(key ? internalInstance.ctx[key] : internalInstance.ctx)
          }
        } catch (e) {
          reject && reject(e)
        }
      }
    )
  })
}

export function rules(props) {
  if (!(props.props && props.props.rules)) return {}
  const model = computed(() => {
    const result = {}
    Object.keys(props.props.rules).forEach(key => {
      result[key.replace(/\./gi, '-')] = parseValueWithData(key, props.store)
    })
    return result
  })
  const rules = computed(() => {
    const result = {}
    Object.entries(props.props.rules).forEach(([key, value]) => {
      result[key.replace(/\./gi, '-')] = value
    })
    Object.entries(result).forEach(([key, value]) => {
      result[key] = value.map(rule => {
        if (!rule.validator) return rule
        const oldValidator = rule.validator
        rule.validator = function (rule, value, callback) {
          oldValidator(rule, value, callback, props.store)
        }
        return rule
      })
    })
    return result
  })
  return {
    model,
    rules
  }
}
