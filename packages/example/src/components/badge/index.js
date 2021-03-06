export default {
  state: {
    badge: 10
  },
  children: [
    {
      componentName: 'lefe-badge',
      state: 'badge',
      children: [
        {
          componentName: 'lefe-button',
          render: '消息'
        }
      ]
    },
    {
      componentName: 'lefe-badge',
      props: {
        isDot: true,
        style: {
          marginLeft: '10px'
        }
      },
      state: 'badge',
      children: [
        {
          componentName: 'lefe-button',
          render: '小红点'
        }
      ]
    }
  ]
}
