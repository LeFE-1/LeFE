export default {
  state: {
    value: 1
  },
  children: [
    {
      componentName: 'lefe-html',
      render: ({ value }) => value
    },
    {
      componentName: 'lefe-input-number',
      state: 'value'
    }
  ]
}
