<template>
  <o-el-tabs v-model="stateValue" v-bind="mergedProps">
    <lefe-block
      v-for="child in children"
      :key="child.id"
      v-bind="child"
      :store="store"
    />
  </o-el-tabs>
</template>

<script>
  import OElTabs from './el-tabs'
  import props from '../../../composition/props'
  import { common, events, exportKey, state } from '../../../composition/setup'
  export default {
    name: 'LeFETabs',
    components: { OElTabs },
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
        ...state(props),
        ...events(props)
      }
    }
  }
</script>
