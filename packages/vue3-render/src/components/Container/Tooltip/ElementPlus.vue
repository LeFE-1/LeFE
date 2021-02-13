<template>
  <el-tooltip v-bind="mergedProps">
    <template #content v-if="childrenContent.length">
      <lefe-block v-for="child in childrenContent"
                  :key="child.id"
                  :store="store"
                  v-bind="child"
      />
    </template>
    <lefe-block v-for="child in childrenDefault"
                :key="child.id"
                :store="store"
                v-bind="child"
    />
  </el-tooltip>
</template>

<script>
  import props from '../../../composition/props'
  import { common, exportKey } from '../../../composition/setup'

  export default {
    name: 'LeFETooltip',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context)
      }
    },
    computed: {
      childrenDefault() {
        return (this.children || []).filter(child => child.slot_LeFE !== 'content');
      },
      childrenContent() {
        return (this.children || []).filter(child => child.slot_LeFE === 'content');
      },
    }
  }
</script>
