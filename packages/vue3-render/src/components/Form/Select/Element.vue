<template>
  <el-select
    v-model="stateValue"
    v-bind="mergedProps"
    @change="stateValueChanged"
    @focus="focus"
    @blur="blur"
    :remote-method="search"
    :loading="loading"
  >
    <el-option
      v-for="item in dataArray"
      :key="item.value"
      :label="item.label"
      :value="mergedProps.pureValue ? item.value : item"
    />
  </el-select>
</template>

<script>
  import props from '../../../composition/props'
  import { common, events, exportKey, state, dataSource } from '../../../composition/setup'

  export default {
    name: 'LeFESelect',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context),
        ...state(props),
        ...events(props),
        ...dataSource(props)
      }
    },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      search(query) {
        const { dataSource } = this
        if (query !== '') {
          this.loading = true
          const params = {}
          if (dataSource && dataSource.searchKey)
            params[dataSource.searchKey] = query
          this.fetch(params)
            .then(data => {
              this.loading = false
              this.dataArray = data
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          this.dataArray = []
        }
      },
      stateValueChanged(value) {
        this.change(value);
        this.trigger('change')
      },
      focus() {
        this.trigger('focus')
      },
      blur() {
        this.trigger('blur')
      }
    }
  }
</script>
