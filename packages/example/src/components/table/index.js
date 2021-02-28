export default {
  state: {
    data: [
      { name: 'a', tel: '111', gender: '男' },
      { name: 'b', tel: '222', gender: '女' }
    ],
    cols: [
      { label: '手机号', prop: 'tel' },
      { label: '性别', prop: 'gender' }
    ]
  },
  methods: {},
  children: [
    {
      dataSource: 'data',
      componentName: 'lefe-table',
      children: [
        {
          componentName: 'lefe-table-column',
          props: {
            label: '名称',
            prop: 'name'
          }
        },
        {
          loop: 'cols',
          loopArgs: ['c', 'cIndex'],
          componentName: 'lefe-table-column',
          props: {
            label_LeFE: 'c.label',
            prop_LeFE: 'c.prop'
          }
        }
      ]
    }
  ]
}
