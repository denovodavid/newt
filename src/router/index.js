import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Signin from '@/components/SignIn'
import Newt from '@/components/Newt'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Newt
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    }
  ]
})
