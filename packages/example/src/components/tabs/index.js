export default {
  state: {
    tab: '1',
    tabs: [
      {
        label: '标签2',
        name: '2'
      },
      {
        label: '标签3',
        name: '3'
      }
    ]
  },
  methods: {
    test() {
      alert('test')
    }
  },
  children: [
    {
      state: 'tab',
      componentName: 'lefe-tabs',
      children: [
        {
          componentName: 'lefe-tab-pane',
          props: {
            label: '标签1',
            name: '1'
          },
          children: [
            {
              componentName: 'lefe-button',
              render: '测试',
              events: {
                click: 'test'
              }
            }
          ]
        },
        {
          loop: 'tabs',
          loopArgs: ['t', 'tIndex'],
          componentName: 'lefe-tab-pane',
          props: {
            label_LeFE: 't.label',
            name_LeFE: 't.name'
          }
        }
      ]
    }
  ]
}
