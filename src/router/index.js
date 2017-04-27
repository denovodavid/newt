import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import * as mutationTypes from '@/store/mutation-types'

function lazyLoadStart () {
  store.commit(mutationTypes.LOADING, 30)
}

function lazyLoadEnd () {
  store.commit(mutationTypes.LOADING, 100)
}

const SignIn = resolve => {
  lazyLoadStart()
  require.ensure(['@/components/SignIn'], () => {
    resolve(require('@/components/SignIn'))
    lazyLoadEnd()
  })
}

const Newt = resolve => {
  lazyLoadStart()
  require.ensure(['@/components/Newt'], () => {
    resolve(require('@/components/Newt'))
    lazyLoadEnd()
  })
}

const Error404 = resolve => {
  lazyLoadStart()
  require.ensure(['@/components/Error404'], () => {
    resolve(require('@/components/Error404'))
    lazyLoadEnd()
  })
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: '404',
      component: Error404
    },
    {
      path: '/',
      name: 'home',
      component: Newt
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    }
  ]
})
