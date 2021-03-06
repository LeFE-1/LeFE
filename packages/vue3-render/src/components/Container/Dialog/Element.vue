<template>
  <el-dialog
    v-model="visible"
    :before-close="handleClose"
    v-bind="mergedProps"
  >
    <lefe-block v-for="child in children"
                v-bind="child"
                :store="store"
                :key="child.id"
    />
    <template #footer v-if="events && events.submit">
      <el-button @click="handleClose">{{ mergedProps.cancelButtonText }}</el-button>
      <el-button type="primary" :loading="eventLoading" @click="handleSubmit">{{ mergedProps.submitButtonText }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import props from '../../../composition/props'
  import { common, exportKey, events, state } from '../../../composition/setup'

  export default {
    name: 'LeFEDialog',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context, { defaultProps: {
            cancelButtonText: '取消',
            submitButtonText: '确定'
          }}),
        ...events(props),
        ...state(props)
      }
    },
    data() {
      return {
        visible: true
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
