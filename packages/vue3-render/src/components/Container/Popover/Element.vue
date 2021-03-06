<template>
  <el-popover
    v-bind="mergedProps"
    @show="show"
    @hide="hide"
  >
    <template #reference v-if="childrenReference.length">
      <lefe-block
        v-for="child in childrenReference"
        :key="child.id"
        :store="store"
        v-bind="child"
      />
    </template>
    <template v-if="childrenDefault.length">
      <lefe-block
        v-for="child in childrenDefault"
        :key="child.id"
        :store="store"
        v-bind="child"
      />
    </template>
  </el-popover>
</template>

<script>
  import props from '../../../composition/props'
  import { common, exportKey, events } from '../../../composition/setup'

  export default {
    name: 'LeFEPopover',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
        ...events(props)
      }
    },
    computed: {
      childrenDefault() {
        return (this.children || []).filter(child => child.slot_LeFE !== 'reference');
      },
      childrenReference() {
        return (this.children || []).filter(child => child.slot_LeFE === 'reference');
      },
    },
    methods: {
      show() {
        this.trigger('show');
      },
      hide() {
        this.trigger('hide');
      },
    },
  }
</script>
