import Page from './src/components/Page'
import Block from './src/components/Block'
// container
import Tabs from "./src/components/Container/Tabs/index";
import TabPane from "./src/components/Container/TabPane/index";
import Table from "./src/components/Container/Table/index";
import TableColumn from "./src/components/Container/TableColumn/index";

// form
import Form from "./src/components/Form/Form/index";
import FormItem from "./src/components/Form/FormItem/index";
import Input from "./src/components/Form/Input/index";
// block
import Button from "./src/components/Block/Button/index";

import LeFEUtils from 'lefe-utils'

const LeFEPage = {
  install: function(app, options) {
    const UILibrary = options.UILibrary || ''
    app.component('lefe-page', Page);
    app.component('lefe-block', Block);
    // container
    app.component('lefe-tabs', Tabs[UILibrary]);
    app.component('lefe-tab-pane', TabPane[UILibrary]);
    app.component('lefe-table', Table[UILibrary]);
    app.component('lefe-table-column', TableColumn[UILibrary]);
    // form
    app.component('lefe-form', Form[UILibrary]);
    app.component('lefe-form-item', FormItem[UILibrary]);
    app.component('lefe-input', Input[UILibrary]);
    // block
    app.component('lefe-button', Button[UILibrary]);
    app.provide('eventEmitter', new LeFEUtils.EventEmitter());
    app.provide('http', options.http)
    // app.config.globalProperties.$eventEmitter = new EventEmitter();
  },
};

export default LeFEPage
