import Toolkit from 'lefe-toolkits'
import Page from './components/Page'
import Block from './components/Block'
// container
import Tabs from './components/Container/Tabs/index'
import TabPane from './components/Container/TabPane/index'
import Table from './components/Container/Table/index'
import TableColumn from './components/Container/TableColumn/index'
import Card from './components/Container/Card/index'
import Row from './components/Container/Row/index'
import Col from './components/Container/Col/index'
import Dialog from './components/Container/Dialog/index'
import Drawer from './components/Container/Drawer/index'
import Popover from './components/Container/Popover/index'
import Tooltip from './components/Container/Tooltip/index'

// form
import Form from './components/Form/Form/index'
import FormItem from './components/Form/FormItem/index'
import Input from './components/Form/Input/index'
import InputNumber from './components/Form/InputNumber/index'
import Checkbox from './components/Form/Checkbox/index'
import Radio from './components/Form/Radio/index'
import DatePicker from './components/Form/DatePicker/index'
import Select from './components/Form/Select/index'
import Switch from './components/Form/Switch/index'
import Transfer from './components/Form/Transfer/index'
// block
import Alert from './components/Block/Alert/index'
import Badge from './components/Block/Badge/index'
import Button from './components/Block/Button/index'
import Html from './components/Block/Html'
import Image from './components/Block/Image/index'
import Link from './components/Block/Link/index'
import Steps from './components/Block/Steps/index'
import Tag from './components/Block/Tag/index'
import Upload from './components/Block/Upload/index'

const LeFEPage = {
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

    app.provide('eventEmitter', new Toolkit.EventEmitter())
    app.provide('http', options.http)
  }
}

export default LeFEPage
