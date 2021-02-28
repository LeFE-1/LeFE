export default {
  state: {},
  methods: {
    show() {
      console.log('show')
    }
  },
  children: [
    {
      componentName: 'lefe-popover',
      events: {
        show: 'show'
      },
      children: [
        {
          slot_LeFE: 'reference',
          componentName: 'lefe-button',
          render: 'click'
        },
        {
          componentName: 'lefe-html',
          render: '内容'
        }
      ]
    }
  ]
}
