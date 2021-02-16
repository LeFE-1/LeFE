<template>
  <el-drawer
    :visible="visible"
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
  import { commonMixin, exportKeyMixin, eventsMixin, stateMixin } from '../../../mixins'

  export default {
    name: 'LeFEDrawer',
    mixins: [commonMixin, exportKeyMixin, eventsMixin, stateMixin],
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
