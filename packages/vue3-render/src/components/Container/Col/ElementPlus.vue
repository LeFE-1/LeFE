<template>
  <el-col v-bind="mergedProps">
    <span v-if="render" v-html="parseRender"></span>
    <lefe-block
      v-for="child in children"
      :key="child.id"
      v-bind="child"
      :store="store"
    />
  </el-col>
</template>

<script>
  import props from '../../../composition/props'
  import { common, exportKey } from '../../../composition/setup'

  export default {
    name: 'LeFECol',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
      }
    }
  }
</script>
