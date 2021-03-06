export default {
  state: {},
  methods: {
    test() {
      alert('hit me')
    }
  },
  children: [
    {
      componentName: 'lefe-html',
      render: '13123'
    },
    {
      componentName: 'lefe-html',
      props: {
        rootTag: 'i',
        class: 'el-icon-add-location'
      },
      events: {
        click: 'test'
      }
    }
  ]
}
