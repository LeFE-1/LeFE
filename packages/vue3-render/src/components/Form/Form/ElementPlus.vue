<template>
  <el-form
    v-bind="mergedProps"
    ref="form"
    :model="model"
    :rules="rules"
  >
    <lefe-block
      v-for="child in children"
      :key="child.id"
      v-bind="child"
      :store="store"
    />
  </el-form>
</template>

<script>
  import props from '../../../composition/props'
  import { common, events, exportKey, rules } from '../../../composition/setup'

  export default {
    name: 'LeFEForm',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
        ...rules(props),
        ...events(props)
      }
    },

    methods: {
      validate() {
        return new Promise((resolve, reject) => {
          this.$refs.form.validate((valid, field) => valid ? resolve() : reject(field))
        })
      }
    }
  }
</script>
