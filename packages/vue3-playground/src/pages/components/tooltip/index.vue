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
          componentName: 'lefe-tooltip',
          children: [
            {
              componentName: 'lefe-button',
              render: 'click'
            },
            {
              slot_LeFE: 'content',
              componentName: 'lefe-html',
              render: '内容'
            }
          ]
        },
      ]
    }
  },
}
</script>
