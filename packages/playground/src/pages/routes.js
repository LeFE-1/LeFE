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

const Components = []

const Routes = [...Index, ...Components, ...Props]

export default Routes
export { Index, Components, Props }
