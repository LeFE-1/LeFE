import Toolkit from 'lefe-toolkits'

export default {
  data() {
    const { state, store } = this.$props
    const stateKey = state === undefined ? state : Toolkit.tpl(state, store)
    return {
      stateValue: stateKey
        ? Toolkit.parseValueWithData(stateKey, store)
        : undefined
    }
  },

  computed: {
    stateKey() {
      const { state, store } = this
      return state === undefined ? state : Toolkit.tpl(state, store)
    }
  },

  created() {
    this.$watch('store.' + this.stateKey, function (newValue) {
      if (newValue == this.stateValue) return
      this.stateValue = newValue
    })
  },

  methods: {
    change(value, key) {
      this.eventEmitter.emit(`change_${this.store.LeFE_ID}`, {
        key: key || this.stateKey,
        value
      })
    }
  }
}
