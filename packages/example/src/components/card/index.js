export default {
  state: {},
  children: [
    {
      componentName: 'lefe-card',
      props: {
        header: '11323',
        shadow: 'hover'
      },
      children: [
        {
          componentName: 'lefe-button',
          render: '测试'
        }
      ]
    },
    {
      componentName: 'lefe-card',
      children: [
        {
          componentName: 'lefe-html',
          slot_LeFE: 'header',
          render: '123123123123123'
        },
        {
          componentName: 'lefe-button',
          render: '测试'
        }
      ]
    }
  ]
}
