<template>
  <el-switch
    v-model="stateValue"
    @change="stateValueChanged"
    v-bind="mergedProps"
  />
</template>

<script>
  import { commonMixin , eventsMixin, exportKeyMixin, stateMixin } from '../../../mixins'

  export default {
    name: 'LeFESwitch',
    mixins: [commonMixin, eventsMixin, exportKeyMixin, stateMixin],
    methods: {
      stateValueChanged(value) {
        this.change(value);
        this.trigger('change')
      }
    }
  }
</script>
