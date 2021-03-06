<template>
  <el-link v-bind="mergedProps">
    {{ parsedRender }}
  </el-link>
</template>

<script>
  import props from '../../../composition/props'
  import { common, exportKey } from '../../../composition/setup'

  export default {
    name: 'LeFELink',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
      }
    }
  }
</script>
