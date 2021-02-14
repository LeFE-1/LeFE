<template>
  <lefe-page v-bind="$data" />
</template>
<script>

export default {
  data() {
    return {
      state: {
        value: 1,
      },
      children: [
        {
          componentName: 'lefe-html',
          render: ({ value }) => value
        },
        {
          componentName: 'lefe-input-number',
          state: 'value'
        },
      ]
    }
  },
}
</script>
