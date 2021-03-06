<template>
  <el-form-item v-bind="mergedProps" :prop="ruleState">
    <lefe-block
      v-for="child in children"
      :key="child.id"
      v-bind="child"
      :store="store"
    />
  </el-form-item>
</template>

<script>
  import LeFE from "@lefe/api";
  import { commonMixin, eventsMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFEFormItem',
    mixins: [commonMixin, eventsMixin, exportKeyMixin],
    computed: {
      ruleState() {
        const { children } = this;
        let state = '';
        LeFE.traversal({ children }, (node) => {
          if (node.state) state = node.state;
        })
        return LeFE.template(state).replace(/\./ig, '-')
      }
    }
  }
</script>
