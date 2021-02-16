<template>
  <el-date-picker
    ref="picker"
    v-model="stateValue"
    @change="stateValueChanged"
    v-bind="mergedProps"
  />
</template>

<script>
  import { commonMixin, eventsMixin, stateMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFEDatePicker',
    mixins: [commonMixin, eventsMixin, stateMixin, exportKeyMixin],
    methods: {
      stateValueChanged(value) {
        this.change(value);
        this.trigger('change')
      },
    }
  }
</script>
