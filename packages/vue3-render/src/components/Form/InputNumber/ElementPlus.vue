<template>
  <el-input-number
    v-bind="mergedProps"
    v-model="stateValue"
    @change="stateValueChanged"
  />
</template>

<script>
  import props from '../../../composition/props'
  import { common, events, exportKey, state } from '../../../composition/setup'

  export default {
    name: 'LeFEInputNumber',
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

<style scoped>

</style>
