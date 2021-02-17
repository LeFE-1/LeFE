<template>
  <el-row v-bind="mergedProps">
    <span v-if="render" v-html="parseRender"></span>
    <lefe-block
      v-for="child in children"
      :key="child.id"
      v-bind="child"
      :store="store"
    />
  </el-row>
</template>

<script>
  import { commonMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFERow',
    mixins: [commonMixin, exportKeyMixin]
  }
</script>
