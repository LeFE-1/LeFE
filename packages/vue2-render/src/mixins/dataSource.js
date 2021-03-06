import LeFE from '@lefe-1/api'

export default {
  data() {
    return {
      dataArray: [],
      originDataArray: []
    }
  },

  created() {
    const { dataSource, store } = this
    if (dataSource) {
      if (dataSource instanceof Array) {
        this.dataArray = dataSource
      } else if (typeof dataSource === 'string') {
        this.dataArray = LeFE.parseValueWithData(dataSource, store)
        this.$watch('store.' + LeFE.template(dataSource, store), newValue => {
          this.dataArray = newValue
          this.originDataArray = newValue
        })
      }
      this.originDataArray = this.dataArray
    }
  },

  methods: {
    fetch(params = {}) {
      const { store, dataSource, http, eventEmitter } = this
      if (typeof dataSource !== 'object')
        return new Promise(resolve => resolve())
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
      return http[method](LeFE.render(url, store), body).then(rep => {
        const repFormat = repFormatter(rep, body, store)
        if (state) {
          eventEmitter.emit(`change_${store.LeFE_ID}`, {
            key: LeFE.template(state, store),
            value: repFormat instanceof Array ? repFormat : repFormat.data
          })
        }
        return repFormat
      })
    }
  }
}
