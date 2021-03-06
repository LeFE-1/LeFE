<template>
  <el-transfer
    ref="transfer"
    v-model="stateValue"
    filterable
    v-bind="mergedProps"
    @change="stateValueChanged"
    :data="dataArray"
  >
    <template slot-scope="{ option }">
      <template v-if="defaultChildren.length">
        <lefe-block
          v-for="child in defaultChildren"
          :key="child.id"
          v-bind="child"
          :store="{
          ...store,
          [mergedProps.vSlot]: option
        }"
        />
      </template>
      <template v-else>
        <span>{{ option.key }} - {{ option.label }}</span>
      </template>
    </template>
    <template slot="left-footer" v-if="leftFooter.length">
      <lefe-block
        v-for="child in leftFooter"
        :key="child.id"
        v-bind="child"
        :store="store"
      />
    </template>
    <template slot="right-footer" v-if="rightFooter.length">
      <lefe-block
        v-for="child in rightFooter"
        :key="child.id"
        v-bind="child"
        :store="store"
      />
    </template>
  </el-transfer>
</template>

<script>
  import { commonMixin, eventsMixin, exportKeyMixin, stateMixin, dataSourceMixin } from '../../../mixins'

  export default {
    name: 'LeFETransfer',
    mixins: [commonMixin, eventsMixin, exportKeyMixin, stateMixin, dataSourceMixin],
    data() {
      return {
        defaultProps: {
          vSlot: 'scope'
        }
      }
    },
    computed: {
      leftFooter() {
        return (this.children || []).filter(child => child.slot_LeFE === 'left-footer')
      },
      rightFooter() {
        return (this.children || []).filter(child => child.slot_LeFE === 'right-footer')
      },
      defaultChildren() {
        return (this.children || []).filter(child => !child.slot_LeFE)
      }
    },
    methods: {
      stateValueChanged(value) {
        this.change(value);
        this.trigger('change')
      }
    }
  }
</script>
