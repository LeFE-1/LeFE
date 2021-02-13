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
          componentName: 'lefe-tag',
          render: '标签'
        },
      ]
    }
  },
}
</script>
