export default {
  state: {},
  children: [
    {
      componentName: 'lefe-tooltip',
      children: [
        {
          componentName: 'lefe-button',
          render: 'click'
        },
        {
          slot_LeFE: 'content',
          componentName: 'lefe-html',
          render: '内容'
        }
      ]
    }
  ]
}
