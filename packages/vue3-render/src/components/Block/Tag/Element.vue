<template>
  <el-tag v-bind="mergedProps" @click.prevent="click">{{ parsedRender }}</el-tag>
</template>

<script>
  import props from '../../../composition/props'
  import { common, events, exportKey } from '../../../composition/setup'

  export default {
    name: 'LeFETag',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
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
