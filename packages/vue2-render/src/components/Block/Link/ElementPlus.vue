<template>
  <el-link v-bind="mergedProps">
    {{ parseRender }}
  </el-link>
</template>

<script>
  import { commonMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFELink',
    mixins: [commonMixin, exportKeyMixin]
  }
</script>
