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
  import { commonMixin, eventsMixin, exportKeyMixin, stateMixin, dataSourceMixin } from '../../../mixins'

  export default {
    name: 'LeFECheckbox',
    mixins: [commonMixin, eventsMixin, exportKeyMixin, stateMixin, dataSourceMixin],
    methods: {
      stateValueChanged(value) {
        this.change(value);
        this.trigger('change')
      },
    }
  }
</script>
