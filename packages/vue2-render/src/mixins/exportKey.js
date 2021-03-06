import LeFE from '@lefe-1/api'

export default {
  created() {
    const { exportsKey, store, eventEmitter } = this
    if (!exportsKey) return
    // const that = this
    const key = LeFE.template(exportsKey, store) + '_' + store.LeFE_ID
    eventEmitter.removeListener(key)
    eventEmitter.addListener(
      key,
      ({ action, key, method, data, params, resolve, reject }) => {
        try {
          switch (action) {
            case 'change':
              Object.entries(data).forEach(([key, value]) => {
                if (this[key] === undefined) {
                  console.warn(`No ${key} defined in ${exportsKey}`)
                } else {
                  this[key] = value
                }
              })
              break
            case 'trigger':
              if (this[method] === undefined) {
                console.warn(`No ${method} method defined in ${exportsKey}`)
                reject()
              } else {
                const p = this[method].call(this, params)
                if (p instanceof Promise) {
                  p.then(rep => resolve(rep)).catch(e => reject(e))
                } else {
                  resolve(p)
                }
              }
              break
            case 'get':
              resolve(key ? this[key] : this)
          }
        } catch (e) {
          reject && reject(e)
        }
      }
    )
  }
}
