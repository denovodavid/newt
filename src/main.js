import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import db from './firebaseDatabase'

Vue.use(VueFire)

console.log('NEWT!')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  data: {
    db: db
  }
});
