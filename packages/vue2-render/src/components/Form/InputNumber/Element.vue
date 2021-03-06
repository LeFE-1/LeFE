<template>
  <el-input-number
    v-bind="mergedProps"
    v-model="stateValue"
    @change="stateValueChanged"
  />
</template>

<script>
  import { commonMixin, eventsMixin, stateMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFEInputNumber',
    mixins: [commonMixin, eventsMixin, stateMixin, exportKeyMixin],
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
