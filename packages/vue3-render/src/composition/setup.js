import {
  computed,
  inject,
  ref,
  getCurrentInstance,
  onBeforeMount,
  watch
} from 'vue'
import LeFE from '@lefe-1/api'

export function common(props, context, params) {
  const { defaultProps = {} } = params || {}

  const mergedProps = computed(() =>
    Object.assign(defaultProps, LeFE.parseProps(props.props, props.store))
  )
  const vif = condition => !!LeFE.parseValue(condition, props.store, true)

  return {
    parseProps: (pProps, data) =>
      LeFE.parseProps(pProps, { ...props.store, ...data }),
    mergedProps,
    renderWithStore: key => LeFE.render(key, props.store),
    vif,
    parseValueWithData: key => LeFE.parseValueWithData(key, props.store),
    parsedRender: computed(() => LeFE.render(props.render, props.store))
  }
}

export function state(props) {
  const eventEmitter = inject('eventEmitter')
  const stateKey = computed(() => {
    const { state } = props
    return state === undefined ? state : LeFE.template(state, props.store)
  })
  const stateValue = ref(LeFE.parseValueWithData(stateKey.value, props.store))
  watch(
    () => LeFE.getByChain(props.store, stateKey.value),
    newValue => {
      if (newValue == stateValue.value) return
      stateValue.value = newValue
    }
  )
  return {
    stateKey,
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
      dataArray.value = LeFE.parseValueWithData(dataSource, props.store)
      watch(
        () => LeFE.getByChain(props.store, dataSource),
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
    return http[method](LeFE.render(url, props.store), body).then(rep => {
      const repFormat = repFormatter(rep, body, store)
      if (state) {
        eventEmitter.emit(`change_${props.store.LeFE_ID}`, {
          key: LeFE.template(state, props.store),
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
    const key =
      LeFE.template(props.exportsKey, props.store) + '_' + props.store.LeFE_ID
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
      result[key.replace(/\./gi, '-')] = LeFE.parseValueWithData(
        key,
        props.store
      )
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
