export default {
  state: {
    visible: false
  },
  methods: {
    submit() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.visible = false
          resolve()
        }, 2000)
      })
    },
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
      componentName: 'lefe-dialog',
      props: {
        title: '弹窗'
      },
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
      ],
      events: {
        submit: 'submit'
      }
    }
  ]
}
