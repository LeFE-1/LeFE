<template>
  <el-image v-bind="mergedProps" :src="stateValue" />
</template>

<script>
  import props from '../../../composition/props'
  import { common, exportKey, state } from '../../../composition/setup'

  export default {
    name: 'LeFEImage',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
        ...state(props)
      }
    }
  }
</script>
