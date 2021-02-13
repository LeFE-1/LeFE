<template>
  <el-card class="box-card" v-bind="mergedProps">
    <template #header v-if="header.length">
      <lefe-block v-for="child in header"
                  :key="child.id"
                  v-bind="child"
                  :store="store"
      />
    </template>
    <lefe-block v-for="child in body"
                :key="child.id"
                v-bind="child"
                :store="store"
    />
  </el-card>
</template>

<script>
  import props from '../../../composition/props'
  import { common, exportKey } from '../../../composition/setup'

  export default {
    name: 'LeFECard',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
      }
    },
    computed: {
      header() {
        return this.children.filter(c => c.slot_LeFE == 'header');
      },
      body() {
        return this.children.filter(c => c.slot_LeFE != 'header');
      }
    }
  }
</script>
