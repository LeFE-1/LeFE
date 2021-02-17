<template>
  <lefe-page v-bind="$data" />
</template>
<script>

export default {
  data() {
    return {
      state: {
        value: '',
        range: []
      },
      children: [
        {
          componentName: 'lefe-html',
          render: ({ value }) => value
        },
        {
          componentName: 'lefe-date-picker',
          state: 'value'
        },
        {
          componentName: 'lefe-html',
          render: ({ range }) => range
        },
        {
          componentName: 'lefe-date-picker',
          props: {
            type: 'daterange'
          },
          state: 'range'
        },
      ]
    }
  },
  methods: {
    input(value) {
      console.log('input', value)
    },
    change(value) {
      console.log('change', value)
    }
  }
}
</script>
