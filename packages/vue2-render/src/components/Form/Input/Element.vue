<template>
  <el-input
    v-bind="mergedProps"
    @input="input"
    @blur="blur"
    @clear="change('')"
    v-model="stateValue"
  >
    <template v-if="mergedProps.prepend" #prepend>{{ renderWithStore(mergedProps.prepend) }}</template>
    <template v-if="mergedProps.append" #append>{{ renderWithStore(mergedProps.append) }}</template>
  </el-input>
</template>

<script>
  import { commonMixin, eventsMixin, stateMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFEInput',
    mixins: [commonMixin, eventsMixin, stateMixin, exportKeyMixin],
    methods: {
      input(value) {
        this.change(value);
      },
      blur() {
        this.trigger('blur');
      },
    }
  }
</script>

<style scoped>

</style>
