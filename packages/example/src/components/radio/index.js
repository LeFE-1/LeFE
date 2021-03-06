export default {
  state: {
    origin: [],
    a: {
      b: ''
    }
  },
  children: [
    {
      componentName: 'lefe-html',
      render: function ({ a }) {
        return a.b
      }
    },
    {
      componentName: 'lefe-radio',
      state: 'a.b',
      dataSource: [
        { label: '2', value: '22' },
        { label: '3', value: '33' },
        { label: '4', value: '44' },
        { label: '5', value: '55' }
      ]
    },
    {
      componentName: 'lefe-radio',
      state: 'a.b',
      dataSource: {
        immediate: true,
        url: '/select/md1',
        method: 'get',
        repFormatter: rep => {
          const { data } = rep.data
          return data.map(({ name, val }) => ({ label: name, value: val }))
        }
      }
    }
  ]
}
