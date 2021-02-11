<template>
  <div id="app">
    <div class="main">
      <lefe-page v-if="!editing" v-bind="page" />
    </div>
    <div class="navbar">
      <div class="tpls">
<!--        <el-row v-for="t in tpls" :key="t.name">-->
<!--          <el-col :span="4">{{ t.name }}</el-col>-->
<!--          <el-col :span="20">-->
<!--            <template v-for="item in t.items">-->
<!--              <el-button-->
<!--                style="margin: 0 5px 5px 0"-->
<!--                :key="'button'+ item.name"-->
<!--                type="primary"-->
<!--                size="small"-->
<!--                @click="copy(item.name)"-->
<!--              >{{ item.name }}</el-button>-->
<!--              <input-->
<!--                :key="'input'+ item.name"-->
<!--                class="hidden"-->
<!--                type="text"-->
<!--                :value="item.tplString"-->
<!--                :ref="item.name"-->
<!--              />-->
<!--            </template>-->
<!--          </el-col>-->
<!--        </el-row>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',

    data() {
      return {
        page: {
          state: {
            a: [],
            page: [],
            tableColumns: [
              { label: '123', key: '123' },
              { label: '222', key: '333' }
            ]
          },
          lifeCycles: {
            mounted() {
              // this._$('t').trigger('fetch');
            }
          },
          methods: {
            sort({ sort }) {
              console.log(sort)
            }
          },
          children: [
            {
              exportsKey: 't',
              state: 'page',
              src: 'http://localhost:8081/async-component.js',
              componentName: 'async-component',
              dataSource: [
                { 123: 11, 333: 111 },
                { 123: 22, 333: 222 }
              ],
              children: [
                { props: { label: '日期' } },
                {
                  loop: 'tableColumns',
                  loopArgs: ['tableColumn', 'tableColumnIndex'],
                  props: {
                    label: '${tableColumn.label}',
                    prop: '${tableColumn.key}',
                    sortable: 'custom'
                  }
                }
              ],
              events: { sort: 'sort' }
            }
          ]
        },
        editing: false,
        cmOptions: {
          mode: {
            name: 'text/javascript',
            json: true
          },
          tabSize: 2, // 缩进单位，默认2
          smartIndent: true, // 是否智能缩进
          theme: 'dracula',
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          //显示行号
          styleActiveLine: true,
          lineNumbers: true,
          lineWrapping: true,
          extraKeys: {
            Ctrl: 'autocomplete'
          },
          hintOptions: {
            hint: this.handleShowHint,
            completeSingle: false
          },
          scrollbarStyle: 'simple'
        },
      }
    },

    methods: {
      onblur() {
        this.editing = true
      },
    }
  }
</script>

<style>
  .main {
    flex: 1;
    padding: 20px;
    overflow: auto;
  }
  .navbar {
    flex: 1;
    height: 100%;
    border-left: 1px solid #999999;
    display: flex;
    flex-direction: column;
  }
  .vue-codemirror {
    flex: 1 !important;
    overflow: hidden;
  }
  .CodeMirror {
    height: 100% !important;
    overflow: auto !important;
  }
  .hidden {
    position: absolute;
    z-index: -100;
    opacity: 0;
    top: 0;
    left: 0;
  }
  .tpls {
    padding: 10px;
  }
</style>
