<template>
  <el-image v-bind="mergedProps" :src="stateValue" />
</template>

<script>
  import { commonMixin, stateMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFEImage',
    mixins: [commonMixin, stateMixin, exportKeyMixin]
  }
</script>
