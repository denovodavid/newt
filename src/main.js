// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import './directives'
import './filters'
import App from './App'
import router from './router'
import { firebaseApp, db } from './firebase'

import { sync } from 'vuex-router-sync'
sync(store, router) // done.
// store.state.route.path   // current path (string)
// store.state.route.params // current params (object)
// store.state.route.query  // current query (object)

Vue.config.productionTip = false

// import imagesLoaded from 'imagesloaded'
// imagesLoaded.makeJQueryPlugin($)

console.log('NEWT!')

firebaseApp.auth().onAuthStateChanged(function (user) {
  if (!user) {
    console.log('User is signed out!')
    router.replace('signin')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    this.$store.dispatch('setNotesRef', db.ref('notes'))
    this.$store.dispatch('setNotesOrderRef', db.ref('notesOrder'))
  }
})
