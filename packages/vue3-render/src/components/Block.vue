<template>
  <template v-if="loop">
    <lefe-block
      v-for="(block, index) in blocks"
      v-bind="$props"
      :id="block._id"
      :key="block._id"
      :store="{
        ...store,
        [loopArgs[0]]: block,
        [loopArgs[1]]: index
      }"
      :loop="undefined"
      :loopArgs="[]"
    />
  </template>
  <component
    v-else-if="vif(condition)"
    v-bind="$props"
    :is="md5componentName"
  />
</template>

<script>
  import Toolkit from 'lefe-toolkits'
  import props from '../composition/props'
  import { common } from '../composition/setup'

  export default {
    name: 'LeFEBlock',
    props,
    setup(props, context) {
      return common(props, context)
    },
    computed: {
      md5componentName() {
        if (this.src || (this.blocks.length && this.blocks[0].src)) {
          return this.componentName + '-' + Toolkit.md5(this.src);
        } else {
          return this.componentName;
        }
      },

      blocks() {
        const { loop } = this;
        return loop instanceof Array
          ? loop
          : typeof loop === 'string'
            ? this.parseValue(loop).map((block, index) => ({
              ...block,
              _id: this.id + '_' + index,
            }))
            : [];
      }
    },

    data() {
      return {
        loaded: false
      }
    },

    created() {
      if (this.src || (this.blocks.length && this.blocks[0].src)) {
        if (!window.System) {
          return console.error('当前环境需引入SystemJS')
        }
        this.loadAsyncComponent();
      } else {
        this.loaded = true
      }
    },

    methods: {
      loadAsyncComponent () {
        const { componentName, md5componentName, src } = this;
        window.System.import(src).then(module => {
          try {
            this.$options.components[md5componentName] = (window.__LeFE_Async || {})[componentName] || module.default;
          } catch(e) {
            console.error('模块加载失败', e);
          }
          this.loaded = true;
        }).catch(e => {
          console.error(e)
        })
      }
    }
  }
</script>
