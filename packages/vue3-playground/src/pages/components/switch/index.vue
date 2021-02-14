<template>
  <lefe-page v-bind="$data" />
</template>
<script>

export default {
  data() {
    return {
      state: {
        value: '',
      },
      children: [
        {
          componentName: 'lefe-html',
          render: function ({ value }) {
            return value
          }
        },
        {
          componentName: 'lefe-switch',
          state: 'value',
          props: {
            activeValue: 1,
            inactiveValue: 0
          }
        },
      ]
    }
  },
}
</script>
