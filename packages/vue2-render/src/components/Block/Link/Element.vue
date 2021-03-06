<template>
  <el-link v-bind="mergedProps">
    {{ parsedRender }}
  </el-link>
</template>

<script>
  import { commonMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFELink',
    mixins: [commonMixin, exportKeyMixin]
  }
</script>
