<template>
  <el-button
    v-bind="mergedProps"
    :loading="eventLoading"
    :disabled="disabled(props.disabled)"
    @click.prevent="click"
  >
    <div style="display: inline-block" v-html="parseRender"></div>
  </el-button>
</template>

<script>
  import props from '../../../composition/props'
  import { common, events, exportKey } from '../../../composition/setup'

  export default {
    name: 'LeFEButton',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context, { defaultProps: { type: 'primary' } }),
        ...events(props)
      }
    },
    methods: {
      click() {
        this.trigger('click')
      }
    }
  }
</script>
