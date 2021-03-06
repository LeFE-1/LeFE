<script>
  import { h } from 'vue'
  import props from "../../composition/props";
  import { common, events, exportKey } from "../../composition/setup";

  export default {
    name: 'LeFEHtml',
    props,
    setup(props, context) {
      exportKey(props)
      return {
        ...common(props, context, {
          defaultProps: {
            rootTag: 'div'
          }
        }),
        ...events(props)
      }
    },
    methods: {
      click() {
        this.trigger('click')
      }
    },
    render: function() {
      const { rootTag, ...restProps } = this.mergedProps;
      return h(rootTag, {
        ...restProps,
        innerHTML: this.parsedRender,
        onClick: this.click
      })
    }
  }
</script>