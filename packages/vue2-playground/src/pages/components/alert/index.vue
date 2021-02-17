<template>
  <lefe-page v-bind="$data" />
</template>
<script>

export default {
  data() {
    return {
      state: {
        
      },
      methods: {
        close() {
          alert('close')  
        }
      },
      children: [
        {
          componentName: 'lefe-alert',
          props: {
            title: '123',
            description: '122222'
          }
        },
        {
          componentName: 'lefe-alert',
          children: [
            {
              componentName: 'lefe-html',
              render: 'lksfjlskdf'
            }
          ],
          events: {
            close: 'close'
          }
        },
      ]
    }
  },
}
</script>
