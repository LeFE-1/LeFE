<template>
  <lefe-page v-bind="$data" />
</template>

<script>
import LefePage from "./components/Page";

export default {
  name: 'App',
  components: {
    LefePage,
  },
  data() {
    return {
      state: {
        popBalanceInfo: {
          popId: '1',
          popName: '2',
          balanceFormart: '3'
        },
        createTime: [],
        pop: {},
        form: {
          username: '123'
        },
        tabName: 'bbb',
        buttons: [{ name: '123'}, {name: '222'}]
      },
      watch: {
        // 'popBalanceInfo.popId': function (val, oldV, context) {
        //   console.log('watch......', val, oldV, context);
        // }
        'popBalanceInfo.popId': {
          handler: function (val, oldV, context) {
            console.log('watch......', val, oldV, context);
          },
          immediate: true
        }
      },
      computed: {
        test(store) {
          return store.popBalanceInfo.popId + store.popBalanceInfo.popName
        }
      },
      methods: {
        a: function() {
          // console.log(params, this)
          // alert(this.popBalanceInfo.popId)
          // this._$('button1').trigger('click')
          // return this._$('button1').change({ test: 333 }).get('test').then(value => {
          //   console.log('ffffffff', value)
          // })
          this._$('form').trigger('validate').then(() => {
            alert('成功')
          }).catch(() => {
            alert('失败')
          })
        },
        b: function() {
          return new Promise((resolve) => {
            setTimeout(() => {
              alert(123123)
              resolve()
            }, 3000)
          })
        }
      },
      lifeCycles: {
        created() {
          setTimeout(() => {
            this.popBalanceInfo.popId = 123;
          }, 1000)
        }
      },
      children: [
        {
          loop: 'buttons',
          loopArgs: ['s', 'sindex'],
          componentName: 'lefe-button',
          render: '${form.username}---${s.name}',
          events: {
            click: ['a', { ttt: '123' }]
          },
        },
        {
          exportsKey: 'button1',
          componentName: 'lefe-button',
          render: '${popBalanceInfo.popId}',
          events: {
            click: 'b'
          }
        },
        {
          exportsKey: 'form',
          componentName: 'lefe-form',
          props: {
            labelWidth: '100',
            inline: true,
            rules: {
              'form.username': [
                { trigger: 'blur', required: true }
              ]
            }
          },
          children: [
            {
              loop: 'buttons',
              loopArgs: ['s', 'sindex'],
              componentName: 'lefe-form-item',
              props: {
                label_LeFE: 'buttons.${sindex}.name',
              },
              children: [
                {
                  props: {
                    append: 'ddd'
                  },
                  componentName: 'lefe-input',
                  state: 'buttons.${sindex}.name'
                }
              ]
            }
          ]
        },
        {
          componentName: 'lefe-tabs',
          state: 'tabName',
          children: [
            {
              loop: 'buttons',
              loopArgs: ['s', 'sindex'],
              componentName: 'lefe-tab-pane',
              props: {
                label_LeFE: 's.name',
                name_LeFE: 's.name'
              },
              children: [
                {
                  exportsKey: 'button1',
                  componentName: 'lefe-button',
                  render: '${popBalanceInfo.popId}',
                  events: {
                    click: 'b'
                  }
                },
              ]
            },
            {
              componentName: 'lefe-tab-pane',
              props: {
                label: 'bbb',
                lazy: true,
                name: 'bbb'
              },
            },
          ]
        },
        {
          condition: false,
          componentName: 'lefe-table',
          dataSource: [
            { a: 1, b: 2, c: 3 },
            { a: 11, b: 22, c: 33 }
          ],
          children: [
            {
              loop: 'buttons',
              loopArgs: ['s', 'sindex'],
              componentName: 'lefe-table-column',
              props: {
                label: '配送信息',
                vSlot: 'rootScope'
              },
              children: [
                {
                  componentName: 'lefe-table-column',
                  props: {
                    vSlot: 'rootScope'
                  },
                  children: [
                    {
                      slot_LeFE: 'header',
                      componentName: 'lefe-button',
                      render: '我就是个按钮',
                      events: {
                        click: 'b'
                      }
                    },
                    {
                      componentName: 'lefe-button',
                      render: '${rootScope.row.a}',
                      events: {
                        click: 'b'
                      }
                    },
                  ]
                },
                {
                  componentName: 'lefe-table-column',
                  props: {
                    label: 'b',
                    vSlot: 'rootScope'
                  },
                  children: [
                    {
                      componentName: 'lefe-button',
                      render: '${rootScope.row.b}',
                      events: {
                        click: 'b'
                      }
                    },
                  ]
                }
              ]

            },
            {
              componentName: 'lefe-table-column',
              props: {
                label: 'b',
                prop: 'a'
              },
              // children: [
              //   {
              //     componentName: 'lefe-button',
              //     render: '${popBalanceInfo.popId}',
              //     events: {
              //       click: 'b'
              //     }
              //   },
              // ]
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
