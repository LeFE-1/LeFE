<template>
  <el-date-picker
    ref="picker"
    v-model="stateValue"
    @change="stateValueChanged"
    v-bind="mergedProps"
  />
</template>

<script>
  import props from '../../../composition/props'
  import { common, events, exportKey, state } from '../../../composition/setup'

  export default {
    name: 'LeFEDatePicker',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
        ...state(props),
        ...events(props),
      }
    },
    methods: {
      stateValueChanged(value) {
        this.change(value);
        this.trigger('change')
      },
    }
  }
</script>
