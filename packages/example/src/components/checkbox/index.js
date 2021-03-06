export default {
  state: {
    origin: [],
    a: {
      b: []
    },
    max: 3,
    disabled: false
  },
  children: [
    {
      componentName: 'lefe-input',
      state: 'max'
    },
    {
      componentName: 'lefe-html',
      render: function ({ a }) {
        return a.b
      }
    },
    {
      props: {
        // max: 2,
        max_LeFE: 'max',
        disabled_LeFE: 'disabled'
      },
      componentName: 'lefe-checkbox',
      state: 'a.b',
      dataSource: [
        {
          label: '1',
          value: '11',
          props: {
            disabled_LeFE: ({ max }) => max / 2 > 1,
            border_LeFE: ({ max }) => max / 2 > 1
          }
        },
        { label: '2', value: '22' },
        { label: '3', value: '33' },
        { label: '4', value: '44' },
        { label: '5', value: '55' }
      ]
    }
  ]
}
