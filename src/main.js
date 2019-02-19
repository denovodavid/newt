import Vue from 'vue'
import store from './store'
import './directives'
import './filters'
import App from './App.vue'
import router from './router'
import { firebaseApp, db } from './firebaseApp'
import './registerServiceWorker'

Vue.config.productionTip = false

// import imagesLoaded from 'imagesloaded'
// imagesLoaded.makeJQueryPlugin($)

console.log('NEWT!')

new Vue({
  router,
  store,
  created () {
    const self = this
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.$store.dispatch('setNotesRef', db.ref(`${user.uid}/notes`))
        self.$store.dispatch('setNotesOrderRef', db.ref(`${user.uid}/notesOrder`))
      } else {
        console.log('User is signed out!')
        router.replace('signin')
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
