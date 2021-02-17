<template>
  <o-el-tabs v-model="stateValue" v-bind="mergedProps">
    <lefe-block
      v-for="child in children"
      :key="child.id"
      v-bind="child"
      :store="store"
    />
  </o-el-tabs>
</template>

<script>
  import OElTabs from './element/tabs'
  import { commonMixin, eventsMixin, exportKeyMixin, stateMixin } from '../../../mixins'
  export default {
    name: 'LeFETabs',
    components: { OElTabs },
    mixins: [ commonMixin, eventsMixin, exportKeyMixin, stateMixin ]
  }
</script>
