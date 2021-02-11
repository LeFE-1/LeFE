export default {
  componentName: String,
  id: String,
  src: String, // async block js 地址
  children: {
    type: Array,
    default: () => []
  },
  slot_LeFE: String, // 容器组件中存在两个及以上插槽时的标识
  state: [String, Array], // 绑定的页面状态
  render: [Number, String, Function],
  // 渲染条件
  condition: {
    type: [String, Function, Boolean],
    default: true
  },

  // 事件对象
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
  // 循环
  loop: [String, Array],
  loopArgs: {
    type: Array,
    default: () => ['scope', 'scopeIndex']
  },

  /**
   * 数据源
   * dataSource: {
   *   trigger: 'focus'
   *   url: '',
   *   method: '',
   *   body: [],
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
}
