<template>
  <el-table-column v-if="!children.length" v-bind="mergedProps" />
  <el-table-column v-else v-bind="mergedProps">
    <template slot="header" v-if="!mergedProps.label">
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
  import { commonMixin, eventsMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFETableColumn',
    mixins: [commonMixin, eventsMixin, exportKeyMixin],
    data() {
      return {
        defaultProps: {
          vSlot: 'scope',
        }
      }
    },
  }
</script>
