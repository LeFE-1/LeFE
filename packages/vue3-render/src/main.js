import Toolkit from 'lefe-toolkits'
import Page from './components/Page'
import Block from './components/Block'
// container
import Tabs from './components/Container/Tabs/index'
import TabPane from './components/Container/TabPane/index'
import Table from './components/Container/Table/index'
import TableColumn from './components/Container/TableColumn/index'

// form
import Form from './components/Form/Form/index'
import FormItem from './components/Form/FormItem/index'
import Input from './components/Form/Input/index'
// block
import Button from './components/Block/Button/index'

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
    // form
    app.component('lefe-form', Form[UILibrary])
    app.component('lefe-form-item', FormItem[UILibrary])
    app.component('lefe-input', Input[UILibrary])
    // block
    app.component('lefe-button', Button[UILibrary])
    app.provide('eventEmitter', new Toolkit.EventEmitter())
    app.provide('http', options.http)
    // app.config.globalProperties.$eventEmitter = new EventEmitter();
  }
}

export default LeFEPage
