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
  import { commonMixin, stateMixin, dataSourceMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFESteps',
    mixins: [commonMixin, stateMixin, dataSourceMixin, exportKeyMixin]
  }
</script>
