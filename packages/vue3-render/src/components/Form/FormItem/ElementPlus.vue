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
  import props from '../../../composition/props'
  import { common, events, exportKey } from '../../../composition/setup'

  export default {
    name: 'LeFEFormItem',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
        ...events(props)
      }
    },
    computed: {
      ruleState() {
        const { children, state } = this;
        const block = this.traversal({ children, state }).find(block => block.state);
        return this.tpl(block.state).replace(/\./ig, '-')
      }
    }
  }
</script>
