<template>
  <el-dialog
    :visible="visible"
    :before-close="handleClose"
    v-bind="mergedProps"
  >
    <lefe-block v-for="child in children"
                v-bind="child"
                :store="store"
                :key="child.id"
    />
    <template slot="footer" v-if="events && events.submit">
      <el-button @click="handleClose">{{ mergedProps.cancelButtonText }}</el-button>
      <el-button type="primary" :loading="eventLoading" @click="handleSubmit">{{ mergedProps.submitButtonText }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { commonMixin, exportKeyMixin, eventsMixin, stateMixin } from '../../../mixins'

  export default {
    name: 'LeFEDialog',
    mixins: [commonMixin, exportKeyMixin, eventsMixin, stateMixin],
    data() {
      return {
        visible: true,
        defaultProps: {
          cancelButtonText: '取消',
          submitButtonText: '确定'
        }
      }
    },
    methods: {
      handleClose() {
        this.trigger('cancel')
        this.change(false, this.condition)
      },
      handleSubmit() {
        this.trigger('submit')
      }
    }
  }
</script>
