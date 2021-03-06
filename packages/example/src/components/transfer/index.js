export default {
  state: {
    value: []
  },
  children: [
    {
      componentName: 'lefe-html',
      render: function ({ value }) {
        return value
      }
    },
    {
      componentName: 'lefe-transfer',
      state: 'value',
      dataSource: [
        {
          label: '标题1',
          key: 1
        },
        {
          label: '标题2',
          key: 2
        },
        {
          label: '标题3',
          key: 3
        }
      ],
      props: {
        titles: ['Source', 'Target']
      },
      children: [
        {
          componentName: 'lefe-html',
          render: ({ scope }) => scope.label
        }
      ]
    }
  ]
}
