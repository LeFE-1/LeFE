export default {
  state: {},
  children: [
    {
      componentName: 'lefe-row',
      render: 'row1'
    },
    {
      componentName: 'lefe-row',
      props: {
        gutter: 24
      },
      children: [
        {
          componentName: 'lefe-col',
          render: 'col1',
          props: {
            span: 12
          }
        },
        {
          componentName: 'lefe-col',
          render: 'col2',
          props: {
            span: 12
          }
        }
      ]
    }
  ]
}
