<template>
  <el-popover
    v-bind="mergedProps"
    @show="show"
    @hide="hide"
  >
    <template slot="reference" v-if="childrenReference.length">
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
  import { commonMixin, exportKeyMixin, eventsMixin } from '../../../mixins'

  export default {
    name: 'LeFEPopover',
    mixins: [commonMixin, exportKeyMixin, eventsMixin],
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
