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
  import { commonMixin, stateMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFEBadge',
    mixins: [commonMixin, stateMixin, exportKeyMixin]
  }
</script>
