<template>
  <el-steps :active="stateValue" v-bind="mergedProps">
    <el-step
      v-for="(step, stepIndex) in dataArray"
      :key="stepIndex"
      v-bind="step"
    />
  </el-steps>
</template>

<script>
  import props from '../../../composition/props'
  import { common, exportKey, state, dataSource } from '../../../composition/setup'

  export default {
    name: 'LeFESteps',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
        ...dataSource(props),
        ...state(props)
      }
    }
  }
</script>
