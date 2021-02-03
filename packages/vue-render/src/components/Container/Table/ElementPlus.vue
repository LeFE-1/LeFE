<template>
  <div>
    <el-table ref="table"
              v-bind="mergedProps"
              :data="dataArray"
              v-loading="loading"
              @selection-change="onSelectionChange"
              @sort-change="onSortChange"
              @expand-change="onExpandChange"
    >
      <lefe-block v-for="child in children"
                  :key="child.id"
                  v-bind="child"
                  :store="store"
      />
    </el-table>
    <el-row type="flex" justify="end" v-if="mergedProps.pagination">
      <el-pagination
        style="margin-top: 20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="mergedProps.pageSizes"
        :page-size="mergedProps.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import props from '../../../composition/props'
  import { common, events, exportKey, dataSource } from '../../../composition/setup'

  export default {
    name: 'LeFETable',
    props,
    setup(props, context) {
      exportKey(props)
      const c = common(props, context, {
        defaultProps: {
          pagination: true,
          pageSizes: [ 10, 20, 50, 100 ]
        }
      })
      const d = dataSource(props);
      return {
        ...c,
        ...events(props),
        ...d,
        pageSize: c.mergedProps.pageSize,
        total: d.dataArray.value.length
      }
    },
    data() {
      return {
        page: 1,
        loading: false,
        selection: [],
      }
    },
    methods: {
      fetch() {
        const { page, pageSize, dataSource, mergedProps: { pagination }, originDataArray } = this;
        if (typeof dataSource === 'string' || dataSource instanceof Array) {
          this.dataArray = pagination ? originDataArray.slice((page - 1) * pageSize, page * pageSize) : originDataArray;
          return;
        }
        this.loading = true;
        return this._fetch({ page, pageSize }).then(({ data, total }) => {
          this.loading = false;
          this.total = total;
          this.dataArray = data;
          this.trigger('loaded', { page, pageSize, total });
        }).catch(e => {
          console.warn(e);
          this.loading = false;
        })
      },

      handleSizeChange(pageSize) {
        this.page = 1;
        this.pageSize = pageSize;
        this.fetch()
      },

      handleCurrentChange(page) {
        this.page = page;
        this.fetch()
      },

      onSortChange({ prop, order }) {
        const { page, pageSize, dataSource } = this;
        if (typeof dataSource === 'string' || dataSource instanceof Array) {
          this.trigger('sort', { page, pageSize, sort: [prop, order] })
          return;
        }
        this.loading = true;
        this._fetch({ page, pageSize, sort: [prop, order] }).then(({ data, total }) => {
          this.loading = false;
          this.total = total;
          this.dataArray = data;
          this.trigger('sort', { page, pageSize, sort: [prop, order] })
        }).catch(e => {
          console.warn(e);
          this.loading = false;
        })
      },

      onSelectionChange() {

      },

      onExpandChange() {

      }
    }
  }
</script>
