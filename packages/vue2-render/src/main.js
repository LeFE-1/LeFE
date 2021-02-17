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
//
// // form
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
// // block
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
  install: function (Vue, options) {
    const UILibrary = options.UILibrary || ''
    Vue.component('lefe-page', Page)
    Vue.component('lefe-block', Block)
    // container
    Vue.component('lefe-tabs', Tabs[UILibrary])
    Vue.component('lefe-tab-pane', TabPane[UILibrary])
    Vue.component('lefe-table', Table[UILibrary])
    Vue.component('lefe-table-column', TableColumn[UILibrary])
    Vue.component('lefe-card', Card[UILibrary])
    Vue.component('lefe-row', Row[UILibrary])
    Vue.component('lefe-col', Col[UILibrary])
    Vue.component('lefe-dialog', Dialog[UILibrary])
    Vue.component('lefe-drawer', Drawer[UILibrary])
    Vue.component('lefe-popover', Popover[UILibrary])
    Vue.component('lefe-tooltip', Tooltip[UILibrary])
    // // form
    Vue.component('lefe-form', Form[UILibrary])
    Vue.component('lefe-form-item', FormItem[UILibrary])
    Vue.component('lefe-input', Input[UILibrary])
    Vue.component('lefe-input-number', InputNumber[UILibrary])
    Vue.component('lefe-checkbox', Checkbox[UILibrary])
    Vue.component('lefe-radio', Radio[UILibrary])
    Vue.component('lefe-date-picker', DatePicker[UILibrary])
    Vue.component('lefe-select', Select[UILibrary])
    Vue.component('lefe-switch', Switch[UILibrary])
    Vue.component('lefe-transfer', Transfer[UILibrary])
    // // block
    Vue.component('lefe-alert', Alert[UILibrary])
    Vue.component('lefe-badge', Badge[UILibrary])
    Vue.component('lefe-button', Button[UILibrary])
    Vue.component('lefe-html', Html)
    Vue.component('lefe-image', Image[UILibrary])
    Vue.component('lefe-link', Link[UILibrary])
    Vue.component('lefe-steps', Steps[UILibrary])
    Vue.component('lefe-tag', Tag[UILibrary])
    Vue.component('lefe-upload', Upload[UILibrary])

    Vue.prototype.eventEmitter = new Toolkit.EventEmitter()
    Vue.prototype.http = options.http
  }
}

export default LeFEPage
