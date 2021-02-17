<template>
  <lefe-page v-bind="$data" />
</template>
<script>

export default {
  data() {
    return {
      state: {
        visible: false
      },
      methods: {
        submit() {
          alert('submit')
          this.visible = false
        },
        open() {
          this.visible = true;
        }
      },
      children: [
        {
          componentName: 'lefe-button',
          events: {
            click: 'open'
          },
          render: '开启'
        },
        {
          condition: 'visible',
          componentName: 'lefe-dialog',
          props: {
            title: '弹窗'
          },
          children: [
            {
              componentName: 'lefe-card',
              children: [
                {
                  componentName: 'lefe-html',
                  render: '内容'
                }
              ]
            }
          ],
          events: {
            submit: 'submit'
          }
        },
      ]
    }
  },
}
</script>
