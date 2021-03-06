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
  import { commonMixin, eventsMixin, exportKeyMixin } from '../../../mixins'
  import LeFE from "@lefe/api";

  export default {
    name: 'LeFEForm',
    
    mixins: [commonMixin, eventsMixin, exportKeyMixin],
    
    computed: {
      model() {
        if (!(this.props && this.props.rules)) return {}
        const result = {}
        Object.keys(this.props.rules).forEach(key => {
          result[key.replace(/\./gi, '-')] = LeFE.parseValueWithData(key, this.store)
        })
        return result
      },
      rules() {
        if (!(this.props && this.props.rules)) return {}
        const result = {}
        Object.entries(this.props.rules).forEach(([key, value]) => {
          result[key.replace(/\./gi, '-')] = value
        })
        Object.entries(result).forEach(([key, value]) => {
          result[key] = value.map(rule => {
            if (!rule.validator) return rule
            const oldValidator = rule.validator
            rule.validator = function (rule, value, callback) {
              oldValidator(rule, value, callback, this.store)
            }
            return rule
          })
        })
        return result
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
