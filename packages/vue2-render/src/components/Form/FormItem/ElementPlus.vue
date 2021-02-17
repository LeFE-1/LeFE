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
  import Toolkit from "lefe-toolkits";
  import { commonMixin, eventsMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFEFormItem',
    mixins: [commonMixin, eventsMixin, exportKeyMixin],
    computed: {
      ruleState() {
        const { children, state } = this;
        const block = Toolkit.traversal({ children, state }).find(block => block.state);
        return this.tpl(block.state).replace(/\./ig, '-')
      }
    }
  }
</script>
