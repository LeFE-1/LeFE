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
  import { commonMixin, eventsMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFEAlert',
    mixins: [commonMixin, eventsMixin, exportKeyMixin],
    methods: {
      close() {
        this.trigger('close')
      }
    }
  }
</script>
