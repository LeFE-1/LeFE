import Toolkit from 'lefe-toolkits'

export default {
  data() {
    return {
      defaultProps: {}
    }
  },

  props: {
    componentName: String,
    id: String,
    src: String, // async block js 地址
    children: {
      type: Array,
      default: () => []
    },
    slot_LeFE: String, // 容器组件中存在两个及以上插槽时的标识
    state: String,
    render: [Number, String, Function],
    // 渲染条件
    condition: {
      type: [String, Function, Boolean],
      default: true
    },

    events: {
      type: Object,
      default: () => ({})
    },
    props: {
      type: Object,
      default: () => ({})
    },
    // 当前页面状态
    store: Object,

    loop: [String, Array],
    loopArgs: {
      type: Array,
      default: () => ['scope', 'scopeIndex']
    },

    // 比较特殊的字段
    /**
     * dataSource: {
     *   immediate: true
     *   url: '',
     *   method: '',
     *   bodyFormatter: function{
     *   repFormatter: function (rep, body, store) {
     *     return []
     *     return { data, total, value }
     *   }
     *   searchKey: ''
     * }
     */
    dataSource: [Object, Array, String],
    exportsKey: String // 对外暴露的唯一标志，可被外部修改自身date和触发method
  },

  computed: {
    mergedProps() {
      return Object.assign(this.defaultProps, this.parseProps(this.props))
    },
    parseRender() {
      return Toolkit.tpl(this.render, this.store)
    }
  },

  methods: {
    parseProps(pProps, data = {}) {
      return Toolkit.parseProps(pProps, { ...this.store, ...data })
    },

    parseValueWithData(key) {
      return Toolkit.parseValueWithData(key, this.store)
    },

    tpl(key) {
      return Toolkit.tpl(key, this.store)
    },

    vif(condition) {
      return !!Toolkit.parseValue(condition, this.store, true)
    }
  }
}
