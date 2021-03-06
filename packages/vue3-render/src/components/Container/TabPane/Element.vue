<template>
  <o-el-tab-pane ref="tabPane" v-bind="mergedProps">
    <lefe-block
      v-for="child in children"
      :key="child.id"
      v-bind="child"
      :store="store"
    />
  </o-el-tab-pane>
</template>

<script>
  import OElTabPane from './el-tab-pane'
  import props from '../../../composition/props'
  import { common, events, exportKey } from '../../../composition/setup'

  export default {
    components: { OElTabPane },
    name: 'LeFETabPane',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
        ...events(props)
      }
    },
  }
</script>
