import Toolkit from 'lefe-toolkits'

export default {
  created() {
    const { exportsKey, store, eventEmitter } = this
    if (!exportsKey) return
    const that = this
    const key = Toolkit.tpl(exportsKey, store) + '_' + store.LeFE_ID
    eventEmitter.removeListener(key)
    eventEmitter.addListener(
      key,
      ({ action, key, method, data, params, resolve, reject }) => {
        try {
          switch (action) {
            case 'change':
              Object.entries(data).forEach(([key, value]) => {
                if (that[key] === undefined) {
                  console.warn(`No ${key} defined in ${exportsKey}`)
                } else {
                  that[key] = value
                }
              })
              break
            case 'trigger':
              if (that[method] === undefined) {
                console.warn(`No ${method} method defined in ${exportsKey}`)
                reject()
              } else {
                const p = that[method].call(that, params)
                if (p instanceof Promise) {
                  p.then(rep => resolve(rep)).catch(e => reject(e))
                } else {
                  resolve(p)
                }
              }
              break
            case 'get':
              resolve(key ? that[key] : that)
          }
        } catch (e) {
          reject && reject(e)
        }
      }
    )
  }
}
