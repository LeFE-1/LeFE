export default {
  state: {
    value: '',
    range: []
  },
  children: [
    {
      componentName: 'lefe-html',
      render: ({ value }) => value
    },
    {
      componentName: 'lefe-date-picker',
      state: 'value'
    },
    {
      componentName: 'lefe-html',
      render: ({ range }) => range
    },
    {
      componentName: 'lefe-date-picker',
      props: {
        type: 'daterange'
      },
      state: 'range'
    }
  ]
}
