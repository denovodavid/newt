import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "newt" */ './components/Newt.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "signin" */ './components/SignIn.vue')
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: "error404" */ './components/Error404.vue')
    }
  ]
})
