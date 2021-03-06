export default {
  state: {
    visible: false
  },
  methods: {
    open() {
      this.visible = true
    }
  },
  children: [
    {
      componentName: 'lefe-button',
      events: {
        click: 'open'
      },
      render: '开启'
    },
    {
      condition: 'visible',
      componentName: 'lefe-drawer',
      children: [
        {
          componentName: 'lefe-card',
          children: [
            {
              componentName: 'lefe-html',
              render: '内容'
            }
          ]
        }
      ]
    }
  ]
}
