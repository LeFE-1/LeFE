<template>
  <el-button
    v-bind="mergedProps"
    :loading="eventLoading"
    @click.prevent="click"
  >
    <div style="display: inline-block" v-html="parsedRender"></div>
  </el-button>
</template>

<script>
  import { commonMixin, eventsMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFEButton',
    mixins: [commonMixin, eventsMixin, exportKeyMixin],
    data() {
      return {
        defaultProps: {
          type: 'primary'
        }
      }
    },
    methods: {
      click() {
        this.trigger('click')
      }
    }
  }
</script>
