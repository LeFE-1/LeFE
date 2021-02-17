<template>
  <lefe-page v-bind="$data" />
</template>
<script>

export default {
  data() {
    return {
      state: {
        files: []
      },
      methods: {
        change() {
          console.log(this.files);  
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
        },
      ]
    }
  },
}
</script>
