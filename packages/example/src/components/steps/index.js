export default {
  state: {
    step: 0
  },
  children: [
    {
      componentName: 'lefe-input-number',
      state: 'step'
    },
    {
      state: 'step',
      componentName: 'lefe-steps',
      dataSource: [
        {
          title: '1',
          description: '111'
        },
        {
          title: '2',
          description: '222'
        }
      ]
    }
  ]
}
