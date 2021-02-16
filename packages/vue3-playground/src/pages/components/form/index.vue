<template>
  <lefe-page v-bind="$data" />
</template>
<script>

export default {
  data() {
    return {
      state: {
        value: 1,
        form: {
          name: '',
          date: ''
        }
      },
      methods: {
        submit() {
          console.log('submit')
          this._$('form').trigger('validate').then(valid => {
            console.log(valid, this.form)
          }).catch(e => {
            console.log(e)
          })
        }
      },
      children: [
        {
          exportsKey: 'form',
          componentName: 'lefe-form',
          props: {
            labelWidth: '150px',
            rules: {
              'form.name': [
                { required: true }
              ],
              'form.date': [
                { required: true }
              ]
            }
          },
          children: [
            {
              props: {
                label: '用户',
              },
              componentName: 'lefe-form-item',
              children: [
                {
                  componentName: 'lefe-input',
                  state: 'form.name'
                }
              ]
            },
            {
              props: {
                label: '有效期',
              },
              componentName: 'lefe-form-item',
              children: [
                {
                  componentName: 'lefe-date-picker',
                  state: 'form.date'
                }
              ]
            }
          ]
        },
        {
          componentName: 'lefe-button',
          events: {
            click: 'submit'
          },
          render: '提交'
        }
      ]
    }
  },
}
</script>
