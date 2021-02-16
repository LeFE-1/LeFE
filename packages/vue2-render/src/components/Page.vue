<template>
  <div>
    <Block
      v-for="(item, index) in children"
      v-bind="item"
      :key="index"
      :store="$data"
    />
  </div>
</template>

<script>
  import Toolkit from 'lefe-toolkits';
  import Block from './Block'

  export default {
    name: 'LeFEPage',

    components: { Block },

    props: {
      componentName: String,
      children: Array,
      state: {
        type: Object,
        default: () => ({}),
      },
      methods: {
        type: Object,
        default: () => ({}),
      },
      watch: { // 语法同vue的watch一致
        type: Object,
        default: () => ({}),
      },
      pageComputed: {
        type: Object,
        default: () => ({}),
      },
      lifeCycles: {
        type: Object,
        default: () => ({}),
      },
    },

    data() {
      const store = JSON.parse(JSON.stringify(this.state)), computed = {}
      Toolkit.getDerivedState(store, { children: this.children });

      Object.entries(this.$props.pageComputed).forEach(([key, value]) => {
        const isObj = Object.prototype.toString.call(value) === '[object Object]';
        const getFunc = isObj ? value.get : value;
        const setFunc = isObj ? value.set : function() { console.error(`Not defined ${key} setter`) };
        Object.defineProperty(computed, key, {
          get: getFunc.bind(this),
          set: setFunc.bind(this)
        })
      })
      return {
        ...store,
        computed,
        LeFE_ID: Toolkit.md5(JSON.stringify(this.state)),
      }
    },

    created() {
      Object.entries(this.methods).forEach(([key, func]) => {
        this[key] = func.bind(this);
      })
      this._initWatch();
      this._initEventBus();
    },

    beforeDestroy() {
      const { $props: { lifeCycles }, LeFE_ID } = this;
      lifeCycles.beforeDestroy && lifeCycles.beforeDestroy.call(this);
      this.eventEmitter.removeListener(`change_${LeFE_ID}`, this._change);
      this.eventEmitter.removeListener(`trigger_${LeFE_ID}`, this._trigger);
    },

    mounted() {
      const { lifeCycles } = this.$props;
      lifeCycles.mounted && lifeCycles.mounted.call(this);
    },

    activated() {
      const { lifeCycles } = this.$props;
      lifeCycles.activated && lifeCycles.activated.call(this);
    },

    deactivated() {
      const { lifeCycles } = this.$props;
      lifeCycles.deactivated && lifeCycles.deactivated.call(this);
    },

    methods: {
      _initWatch() {
        Object.entries(this.$props.watch).forEach(([key, value]) => {
          if (Object.prototype.toString.call(value) === '[object Function]') {
            this.$watch(key, value.bind(this));
          } else if (Object.prototype.toString.call(value) === '[object Object]') {
            const { handler, ...options } = value;
            this.$watch(key, handler.bind(this), options);
          } else {
            console.error(`watch ${key} options error`)
          }
        })
      },

      _initEventBus() {
        const { LeFE_ID } = this;
        this.eventEmitter.addListener(`change_${LeFE_ID}`, this._change);
        this.eventEmitter.addListener(`trigger_${LeFE_ID}`, this._trigger);
      },

      _$(id) {
        const { LeFE_ID, eventEmitter } = this;
        return (function (id, eventEmitter) {
          return {
            trigger: function (method, params) {
              return new Promise((resolve, reject) => {
                eventEmitter.emit(id, { action: 'trigger', method, params, resolve, reject });
              })
            },
            change: function (data) {
              eventEmitter.emit(id, { action: 'change', data });
              return this;
            },
            get: function (key) {
              return new Promise((resolve, reject) => {
                eventEmitter.emit(id, { action: 'get', key, resolve, reject });
              })
            }
          }
        })(id + '_' + LeFE_ID, eventEmitter)
      },

      _change(data) {
        const { key, value, resolve, reject } = data || {};
        if (!Object.prototype.hasOwnProperty.call(this, key)) {  // XXX 只支持 a.b 形式
          if (key.includes('.')) {
            const keys = key.split('.');
            const parent = Toolkit.getByChain(this, keys.splice(0, keys.length - 1));
            parent[keys[keys.length - 1]] = value;
            return resolve && resolve(value);
          }
          console.warn(`'${key}' not initialize in data, please define '${key}' in page.state`);
          return reject && reject();
        }
        this[key] = value;
        return resolve && resolve(value);
      },

      _trigger(data) {
        const { method, params, resolve, reject } = data || {};
        if(!this[method]) {
          console.warn(`No method named '${method}', please define '${method}' in page.methods`);
          reject && reject();
          return;
        }
        try {
          const p = this[method].call(this, params);
          if (p instanceof Promise) {
            if (!resolve) return console.warn(`No resolve in '${method}' method`,)
            p.then(rep => resolve(rep)).catch(e => reject(e))
          } else {
            resolve(p)
          }
        } catch (e) {
          console.error(e);
          reject && reject();
        }
      }
    }
  }
</script>
