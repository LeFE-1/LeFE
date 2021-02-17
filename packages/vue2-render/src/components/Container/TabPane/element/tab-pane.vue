<template>
  <div
    class="el-tab-pane"
    v-if="(!lazy || loaded) || active"
    v-show="active"
    role="tabpanel"
    :aria-hidden="!active"
    :id="`pane-${paneName}`"
    :aria-labelledby="`tab-${paneName}`"
  >
    <slot></slot>
  </div>
</template>
<script>
  /* eslint-disable */
  export default {
    name: 'OElTabPane',

    componentName: 'OElTabPane',

    props: {
      label: String,
      labelContent: Function,
      name: String,
      closable: Boolean,
      disabled: Boolean,
      lazy: Boolean
    },

    data() {
      return {
        index: null,
        loaded: false
      };
    },

    created() {
      this.actualParent.paneComponents && this.actualParent.paneComponents.push(this)
    },

    computed: {
      actualParent() {
        let node = this.$parent;
        while(node && node.$options.name !== 'OElTabs') {
          node = node.$parent
        } 
        if (!node) throw Error('tab-pane should be in a tabs')
        return node;
      },
      isClosable() {
        return this.closable || this.actualParent.closable;
      },
      active() {
        const active = this.actualParent.currentName === (this.name || this.index);
        if (active) {
          this.loaded = true;
        }
        return active;
      },
      paneName() {
        return this.name || this.index;
      }
    },

    updated() {
      this.actualParent.$emit('tab-nav-update');
    }
  };
</script>
