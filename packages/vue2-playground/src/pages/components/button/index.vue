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
        click() {
          return new Promise((resolve => {
            setTimeout(() => {
              resolve()
            }, 3000)
          }))
        }
      },
      children: [
        {
          componentName: 'lefe-button',
          render: 'Promise',
          events: {
            click: 'click'
          }
        },
      ]
    }
  },
}
</script>
