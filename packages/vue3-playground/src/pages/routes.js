import { h } from 'vue'
import examples from '@lefe-1/example'
import Render from '@lefe-1/vue3-render'

const Index = [
  {
    path: '/',
    name: 'Playground 实验室',
    component: () => import('./playground')
  }
]

const Props = [
  // {
  //   path: '/state',
  //   name: 'state',
  //   component: () => import('./props/state/index.vue')
  // }
]

const Components = examples.map(c => ({
  path: '/' + c.name,
  name: c.name,
  component: () =>
    Promise.resolve({
      render: function () {
        return h(Render.Page, {
          ...c.module
        })
      }
    })
}))

const Routes = [...Index, ...Components, ...Props]

export default Routes
export { Index, Components, Props }
