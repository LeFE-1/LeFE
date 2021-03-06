<template>
  <o-el-tab-pane ref="tabPane" v-bind="mergedProps">
    <lefe-block
      v-for="child in children"
      :key="child.id"
      v-bind="child"
      :store="store"
    />
  </o-el-tab-pane>
</template>

<script>
  import OElTabPane from './element/tab-pane'
  import { commonMixin, eventsMixin, exportKeyMixin } from '../../../mixins'

  export default {
    components: { OElTabPane },
    name: 'LeFETabPane',
    mixins: [commonMixin, eventsMixin, exportKeyMixin],
  }
</script>
