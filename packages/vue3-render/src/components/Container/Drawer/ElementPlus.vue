<template>
  <el-drawer
    v-model="visible"
    :before-close="handleClose"
    v-bind="mergedProps"
  >
    <lefe-block v-for="child in children"
                v-bind="child"
                :store="store"
                :key="child.id"
    />
  </el-drawer>
</template>

<script>
  import props from '../../../composition/props'
  import { common, exportKey, events, state } from '../../../composition/setup'

  export default {
    name: 'LeFEDrawer',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
        ...events(props),
        ...state(props)
      }
    },
    data() {
      return {
        visible: true
      }
    },
    methods: {
      handleClose() {
        this.trigger('cancel')
        this.change(false, this.condition)
      },
    }
  }
</script>
