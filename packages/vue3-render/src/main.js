import LeFE from '@lefe-1/api'
import Page from './components/Page.vue'
import Block from './components/Block.vue'
// container
import Tabs from './components/Container/Tabs/index.js'
import TabPane from './components/Container/TabPane/index.js'
import Table from './components/Container/Table/index.js'
import TableColumn from './components/Container/TableColumn/index.js'
import Card from './components/Container/Card/index.js'
import Row from './components/Container/Row/index.js'
import Col from './components/Container/Col/index.js'
import Dialog from './components/Container/Dialog/index.js'
import Drawer from './components/Container/Drawer/index.js'
import Popover from './components/Container/Popover/index.js'
import Tooltip from './components/Container/Tooltip/index.js'

// form
import Form from './components/Form/Form/index.js'
import FormItem from './components/Form/FormItem/index.js'
import Input from './components/Form/Input/index.js'
import InputNumber from './components/Form/InputNumber/index.js'
import Checkbox from './components/Form/Checkbox/index.js'
import Radio from './components/Form/Radio/index.js'
import DatePicker from './components/Form/DatePicker/index.js'
import Select from './components/Form/Select/index.js'
import Switch from './components/Form/Switch/index.js'
import Transfer from './components/Form/Transfer/index.js'
// block
import Alert from './components/Block/Alert/index.js'
import Badge from './components/Block/Badge/index.js'
import Button from './components/Block/Button/index.js'
import Html from './components/Block/Html.vue'
import Image from './components/Block/Image/index.js'
import Link from './components/Block/Link/index.js'
import Steps from './components/Block/Steps/index.js'
import Tag from './components/Block/Tag/index.js'
import Upload from './components/Block/Upload/index.js'

import props from './composition/props'
import {
  common,
  state,
  events,
  dataSource,
  exportKey
} from './composition/setup'

const Render = {
  install: function (app, options) {
    const UILibrary = options.UILibrary || ''
    app.component('lefe-page', Page)
    app.component('lefe-block', Block)
    // container
    app.component('lefe-tabs', Tabs[UILibrary])
    app.component('lefe-tab-pane', TabPane[UILibrary])
    app.component('lefe-table', Table[UILibrary])
    app.component('lefe-table-column', TableColumn[UILibrary])
    app.component('lefe-card', Card[UILibrary])
    app.component('lefe-row', Row[UILibrary])
    app.component('lefe-col', Col[UILibrary])
    app.component('lefe-dialog', Dialog[UILibrary])
    app.component('lefe-drawer', Drawer[UILibrary])
    app.component('lefe-popover', Popover[UILibrary])
    app.component('lefe-tooltip', Tooltip[UILibrary])
    // form
    app.component('lefe-form', Form[UILibrary])
    app.component('lefe-form-item', FormItem[UILibrary])
    app.component('lefe-input', Input[UILibrary])
    app.component('lefe-input-number', InputNumber[UILibrary])
    app.component('lefe-checkbox', Checkbox[UILibrary])
    app.component('lefe-radio', Radio[UILibrary])
    app.component('lefe-date-picker', DatePicker[UILibrary])
    app.component('lefe-select', Select[UILibrary])
    app.component('lefe-switch', Switch[UILibrary])
    app.component('lefe-transfer', Transfer[UILibrary])
    // block
    app.component('lefe-alert', Alert[UILibrary])
    app.component('lefe-badge', Badge[UILibrary])
    app.component('lefe-button', Button[UILibrary])
    app.component('lefe-html', Html)
    app.component('lefe-image', Image[UILibrary])
    app.component('lefe-link', Link[UILibrary])
    app.component('lefe-steps', Steps[UILibrary])
    app.component('lefe-tag', Tag[UILibrary])
    app.component('lefe-upload', Upload[UILibrary])

    app.provide('eventEmitter', new LeFE.EventEmitter())
    app.provide('http', options.http)
  },
  Page,
  Block,
  setup: {
    props,
    common,
    state,
    events,
    dataSource,
    exportKey
  }
}

export default Render
