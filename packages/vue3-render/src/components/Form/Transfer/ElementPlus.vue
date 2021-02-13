<template>
  <el-transfer
    ref="transfer"
    v-model="stateValue"
    filterable
    v-bind="mergedProps"
    @change="stateValueChanged"
    :data="dataArray"
  >
    <template #default="{option}">
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
    <template #left-footer v-if="leftFooter.length">
      <lefe-block
        v-for="child in leftFooter"
        :key="child.id"
        v-bind="child"
        :store="store"
      />
    </template>
    <template #right-footer v-if="rightFooter.length">
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
  import props from '../../../composition/props'
  import { common, events, exportKey, state, dataSource } from '../../../composition/setup'

  export default {
    name: 'LeFETransfer',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context, {
          defaultProps: {
            vSlot: 'scope',
          }
        }),
        ...state(props),
        ...events(props),
        ...dataSource(props)
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
