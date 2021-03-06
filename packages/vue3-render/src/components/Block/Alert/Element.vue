<template>
  <el-alert
    v-bind="mergedProps"
    @close="close"
  >
    <template v-if="children && children.length">
      <lefe-block v-for="child in children"
                  :key="child.id"
                  v-bind="child"
                  :store="store"
      />
    </template>
  </el-alert>
</template>

<script>
  import props from '../../../composition/props'
  import { common, events, exportKey } from '../../../composition/setup'

  export default {
    name: 'LeFEAlert',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
        ...events(props)
      }
    },
    methods: {
      close() {
        this.trigger('close')
      }
    }
  }
</script>
