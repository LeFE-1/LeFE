export default {
  state: {
    files: []
  },
  methods: {
    change() {
      console.log(this.files)
    }
  },
  children: [
    {
      componentName: 'lefe-upload',
      state: 'files',
      props: {
        multiple: true
      },
      events: {
        change: 'change'
      },
      children: [
        {
          slot_LeFE: 'trigger',
          componentName: 'lefe-button',
          render: '上传'
        }
      ]
    }
  ]
}
