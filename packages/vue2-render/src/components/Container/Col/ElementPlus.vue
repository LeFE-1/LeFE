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
  import { commonMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFECol',
    mixins: [commonMixin, exportKeyMixin]
  }
</script>
