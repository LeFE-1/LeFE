<template>
  <el-tooltip v-bind="mergedProps">
    <template slot="content" v-if="childrenContent.length">
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
  import { commonMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFETooltip',
    mixins: [commonMixin, exportKeyMixin],
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
