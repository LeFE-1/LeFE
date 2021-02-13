<template>
  <lefe-page v-bind="$data" />
</template>
<script>

export default {
  data() {
    return {
      state: {
        
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
          ]
        },
      ]
    }
  },
}
</script>
