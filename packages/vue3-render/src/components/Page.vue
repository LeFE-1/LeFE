<template>
  <Block
    v-for="(item, index) in children"
    v-bind="item"
    :key="index"
    :store="store"
  />
</template>

<script>
  import { reactive, computed, watch, inject, ref } from 'vue'
  import Block from './Block.vue'
  import LeFE from '@lefe/api';

  export default {
    name: 'LeFEPage',

    components: { Block },

    props: {
      children: Array,
      state: {
        type: Object,
        default: () => ({}),
      },
      methods: {
        type: Object,
        default: () => ({}),
      },
      watch: {
        type: Object,
        default: () => ({}),
      },
      computed: {
        type: Object,
        default: () => ({}),
      },
      lifeCycles: {
        type: Object,
        default: () => ({}),
      },
    },

    setup(props, context) {
      // LeFE.getDerivedState(JSON.parse(JSON.stringify(props.state)), { children: props.children })
      LeFE.traversal({ children: props.children }, node => node.id || LeFE.md5(JSON.stringify(node) + Math.random()))
      const eventEmitter = inject('eventEmitter');
      const store = {};
      Object.keys(props.state).forEach(key => {
        store[key] = Object.prototype.toString.call(props.state[key]) === "object"
          ? reactive(props.state[key])
          : ref(props.state[key])
      })

      const pageComputed = {};
      Object.keys(props.computed).forEach(key => {
        const value = props.computed[key];
        const isObj = Object.prototype.toString.call(value) === '[object Object]';
        const getFunc = isObj ? value.get : value;
        const setFunc = isObj ? value.set : function() { console.error(`Not defined ${key} setter`) };
        pageComputed[key] = computed({
          get: () => getFunc(store),
          set: () => setFunc(store)
        })
      })

      Object.keys(props.watch).forEach(key => {
        const value = props.watch[key];
        if (Object.prototype.toString.call(value) === '[object Function]') {
          watch(
            () => LeFE.getByChain(store, key),
            (newVal, oldVal) => value(newVal, oldVal, context),
          )
        } else if (Object.prototype.toString.call(value) === '[object Object]') {
          const { handler, ...options } = value;
          watch(
            () => LeFE.getByChain(store, key),
            (newVal, oldVal) => handler(newVal, oldVal, context),
            options
          )
        } else {
          console.error(`watch ${key} options error`)
        }
      })

      return {
        eventEmitter,
        ...store,
        ...pageComputed,
      }
    },

    data() {
      return {
        LeFE_ID: LeFE.md5(JSON.stringify(this.state)),
      }
    },

    created() {
      const { lifeCycles } = this.$props;
      Object.entries(this.methods).forEach(([key, func]) => {
        this[key] = func.bind(this);
      })
      this._initEventEmitter();
      lifeCycles.created && lifeCycles.created.call(this);
    },

    computed: {
      store() {
        const store = { LeFE_ID: this.LeFE_ID };
        Object.keys(Object.assign(this.computed, this.state)).forEach(key => {
          store[key] = this[key]
        })
        return store;
      }
    },

    beforeUnmount() {
      const { $props: { lifeCycles }, LeFE_ID } = this;
      lifeCycles.beforeUnmount && lifeCycles.beforeUnmount.call(this);
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
      _initEventEmitter() {
        const { LeFE_ID } = this;
        this.eventEmitter.addListener(`change_${LeFE_ID}`, this._change);
        this.eventEmitter.addListener(`trigger_${LeFE_ID}`, this._trigger);
      },

      _change(data) {
        const { key, value, resolve, reject } = data || {};
        if (!Object.prototype.hasOwnProperty.call(this, key)) {  // XXX 只支持 a.b 形式
          if (key.includes('.')) {
            const keys = key.split('.');
            const parent = LeFE.getByChain(this, keys.splice(0, keys.length - 1));
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
      },
      // TODO cache?
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
      }
    }

  }
</script>
