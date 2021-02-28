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
