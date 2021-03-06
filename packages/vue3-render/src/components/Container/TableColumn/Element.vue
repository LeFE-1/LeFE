<template>
  <el-table-column v-if="!children.length" v-bind="mergedProps" />
  <el-table-column v-else v-bind="mergedProps">
    <template #header v-if="!mergedProps.label">
      <lefe-block v-for="child in children.filter(child => child.slot_LeFE == 'header')"
                  :key="child.id"
                  v-bind="child"
                  :store="store"
      />
    </template>
    <template v-slot="scope">
      <lefe-block v-for="child in children.filter(child => child.slot_LeFE != 'header')"
                  :key="child.id"
                  v-bind="child"
                  :store="{
                    ...store,
                    [mergedProps.vSlot]: scope
                  }"
      />
    </template>
  </el-table-column>
</template>

<script>
  import props from '../../../composition/props'
  import { common, events, exportKey } from '../../../composition/setup'

  export default {
    name: 'LeFETableColumn',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context, {
          defaultProps: {
            vSlot: 'scope',
          }
        }),
        ...events(props)
      }
    },
  }
</script>
