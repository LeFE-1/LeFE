<template>
  <el-tag v-bind="mergedProps" @click.prevent="click">{{ parsedRender }}</el-tag>
</template>

<script>
  import { commonMixin, eventsMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFETag',
    mixins: [commonMixin, eventsMixin, exportKeyMixin],
    methods: {
      click() {
        this.trigger('click')
      }
    }
  }
</script>
