<template>
  <el-upload 
    ref="uploader"
    v-bind="mergedProps"
    :on-change="onChange"
    :on-remove="onRemove"
    :on-exceed="onExceed"
  >
    <template v-if="childrenTrigger.length" #trigger>
      <lefe-block v-for="child in childrenTrigger"
                  :key="child.id"
                  v-bind="child"
                  :store="store"
      />
    </template>
    <template v-if="childrenDefault.length">
      <lefe-block v-for="child in childrenDefault"
                  :key="child.id"
                  v-bind="child"
                  :store="store"
      />
    </template>
    <template v-if="childrenTip.length" #tip>
      <lefe-block v-for="child in childrenTip"
                  :key="child.id"
                  v-bind="child"
                  :store="store"
      />
    </template>
  </el-upload>
</template>

<script>
  import { commonMixin, eventsMixin, stateMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFEUpload',
    mixins: [commonMixin, eventsMixin, stateMixin, exportKeyMixin],
    data() {
      return {
        defaultProps: {
          action: '',
          multiple: true,
          'auto-upload': false,
          'before-upload': () => false,
        }
      }
    },
    computed: {
      childrenTrigger() {
        return this.children.filter(child => child.slot_LeFE === 'trigger')
      },
      childrenTip() {
        return this.children.filter(child => child.slot_LeFE === 'tip')
      },
      childrenDefault() {
        return this.children.filter(child => !child.slot_LeFE)
      }
    },
    methods: {
      onChange(file, fileList) {
        this.change(fileList);
        this.trigger('change', { file, fileList })
      },
      onRemove(file, fileList) {
        this.change(fileList);
        this.trigger('change', { file, fileList })
      },
      onExceed(file, fileList) {
        this.trigger('exceed', { file, fileList })
      }
    }
  }
</script>
