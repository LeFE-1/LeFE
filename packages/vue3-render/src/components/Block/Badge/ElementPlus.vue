<template>
  <el-badge v-bind="mergedProps" :value="stateValue">
    <lefe-block v-for="child in children"
                :key="child.id"
                v-bind="child"
                :store="store"
    />
  </el-badge>
</template>

<script>
  import props from '../../../composition/props'
  import { common, exportKey, state } from '../../../composition/setup'

  export default {
    name: 'LeFEBadge',
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
