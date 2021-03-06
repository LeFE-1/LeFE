<template>
  <el-card class="box-card" v-bind="mergedProps">
    <template slot="header" v-if="header.length">
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
  import { commonMixin, exportKeyMixin } from '../../../mixins'

  export default {
    name: 'LeFECard',
    mixins: [commonMixin, exportKeyMixin],
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
