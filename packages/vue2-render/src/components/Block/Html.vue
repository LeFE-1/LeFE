<script>
  import { commonMixin, eventsMixin, exportKeyMixin } from "../../mixins";

  export default {
    name: 'LeFEHtml',
    mixins: [commonMixin, eventsMixin, exportKeyMixin],
    data() {
      return {
        defaultProps: {
          rootTag: 'div'
        }
      }
    },
    methods: {
      click() {
        this.trigger('click')
      }
    },
    render: function(h) {
      const { rootTag, style, attrs, ...domProps } = this.mergedProps;
      return h(rootTag, {
        class: domProps.class,
        style,
        attrs,
        domProps: {
          ...domProps,
          innerHTML: this.parsedRender,
        },
        on: {
          click: this.click
        },
      })
    }
  }
</script>