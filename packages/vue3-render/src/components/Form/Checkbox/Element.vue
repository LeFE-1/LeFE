<template>
  <el-checkbox-group
    v-bind="mergedProps"
    v-model="stateValue" 
    @change="stateValueChanged"
  >
    <template v-if="mergedProps.type == 'button'">
      <el-checkbox-button
        v-for="option in dataArray"
        :label="option.value"
        :key="option.value"
        v-bind="parseProps(option.props, option)"
      >
        {{ option.label }}
      </el-checkbox-button>
    </template>
    <template v-else>
      <el-checkbox
        v-for="option in dataArray"
        :label="option.value"
        :key="option.value"
        v-bind="parseProps(option.props, option)"
      >
        {{ option.label }}
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script>
  import props from '../../../composition/props'
  import { common, events, exportKey, state, dataSource } from '../../../composition/setup'

  export default {
    name: 'LeFECheckbox',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
        ...state(props),
        ...events(props),
        ...dataSource(props)
      }
    },
    methods: {
      stateValueChanged(value) {
        this.change(value);
        this.trigger('change')
      },
    }
  }
</script>

<style scoped>

</style>
