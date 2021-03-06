export default {
  state: {
    disabled: false
  },
  methods: {
    toggle() {
      this.disabled = !this.disabled
    }
  },
  children: [
    {
      componentName: 'lefe-link',
      render: '内容',
      props: {
        disabled_LeFE: 'disabled',
        href: 'https://www.baidu.com'
      }
    },
    {
      componentName: 'lefe-button',
      render: 'Toggle',
      events: {
        click: 'toggle'
      }
    }
  ]
}
