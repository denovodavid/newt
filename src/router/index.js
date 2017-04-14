import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Newt from '@/components/Newt'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Newt',
      component: Newt
    }
  ]
})
