export default {
  state: {
    value: '',
    pureValue: '55'
  },
  children: [
    {
      componentName: 'lefe-html',
      render: function ({ value }) {
        return JSON.stringify(value)
      }
    },
    {
      componentName: 'lefe-select',
      state: 'value',
      dataSource: [
        { label: '2', value: '22' },
        { label: '3', value: '33' },
        { label: '4', value: '44' },
        { label: '5', value: '55' }
      ]
    },
    {
      componentName: 'lefe-html',
      render: function ({ pureValue }) {
        return pureValue
      }
    },
    {
      props: {
        pureValue: true
      },
      componentName: 'lefe-select',
      state: 'pureValue',
      dataSource: [
        { label: '2', value: '22' },
        { label: '3', value: '33' },
        { label: '4', value: '44' },
        { label: '5', value: '55' }
      ]
    }
  ]
}
