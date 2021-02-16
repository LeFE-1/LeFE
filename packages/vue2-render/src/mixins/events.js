export default {
  data() {
    return {
      eventLoading: false
    }
  },

  methods: {
    getMethod(method) {
      return method instanceof Array ? method : [method, {}]
    },

    trigger(eventName) {
      const { events, store, eventEmitter } = this
      if (!events || !events[eventName]) return false
      const [method, params] = this.getMethod(events[eventName])
      this.eventLoading = true
      new Promise((resolve, reject) => {
        eventEmitter.emit(`trigger_${store.LeFE_ID}`, {
          method,
          params,
          resolve,
          reject
        })
      })
        .then(() => {
          this.eventLoading = false
        })
        .catch(() => {
          this.eventLoading = false
        })
    }
  }
}
