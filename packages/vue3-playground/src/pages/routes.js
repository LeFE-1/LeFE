const Index = [
  {
    path: '/',
    name: 'Playground 实验室',
    component: () => import('./index.vue')
  }
]

const Props = [
  {
    path: '/state',
    name: 'state',
    component: () => import('./props/state/index')
  }
]

const Components = [
  {
    path: '/html',
    name: 'html',
    component: () => import('./components/html/index')
  },
  {
    path: '/image',
    name: 'image',
    component: () => import('./components/image/index')
  },
  {
    path: '/link',
    name: 'link',
    component: () => import('./components/link/index')
  },
  {
    path: '/alert',
    name: 'alert',
    component: () => import('./components/alert/index')
  },
  {
    path: '/badge',
    name: 'badge',
    component: () => import('./components/badge/index')
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('./components/form/index')
  },
  {
    path: '/checkbox',
    name: 'checkbox',
    component: () => import('./components/checkbox/index')
  },
  {
    path: '/radio',
    name: 'radio',
    component: () => import('./components/radio/index')
  },
  {
    path: '/datepicker',
    name: 'datepicker',
    component: () => import('./components/datepicker/index')
  },
  {
    path: '/inputNumber',
    name: 'inputNumber',
    component: () => import('./components/inputNumber/index')
  },
  {
    path: '/select',
    name: 'select',
    component: () => import('./components/select/index')
  },
  {
    path: '/switch',
    name: 'switch',
    component: () => import('./components/switch/index')
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: () => import('./components/transfer/index')
  },
  {
    path: '/card',
    name: 'card',
    component: () => import('./components/card/index')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('./components/layout/index')
  },
  {
    path: '/dialog',
    name: 'dialog',
    component: () => import('./components/dialog/index')
  },
  {
    path: '/drawer',
    name: 'drawer',
    component: () => import('./components/drawer/index')
  },
  {
    path: '/popover',
    name: 'popover',
    component: () => import('./components/popover/index')
  },
  {
    path: '/steps',
    name: 'steps',
    component: () => import('./components/steps/index')
  },
  {
    path: '/tag',
    name: 'tag',
    component: () => import('./components/tag/index')
  },
  {
    path: '/tooltip',
    name: 'tooltip',
    component: () => import('./components/tooltip/index')
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('./components/upload/index')
  },
  {
    path: '/tabs',
    name: 'tabs',
    component: () => import('./components/tabs/index')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('./components/table/index')
  }
]

const Routes = [...Index, ...Components, ...Props]

export default Routes
export { Index, Components, Props }
