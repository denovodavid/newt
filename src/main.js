// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import 'jquery-ui/jquery-ui.min.js'

// import imagesLoaded from 'imagesloaded'
// imagesLoaded.makeJQueryPlugin($)

import 'semantic-ui-css/semantic.js'
import 'semantic-ui-css/semantic.css'

// import marked from 'marked'

import AutoSize from 'autosize'

Vue.use(VueFire)

// Register a global custom directive called v-dropdown
Vue.directive('dropdown', {
  bind (el) {
    $(el).dropdown()
  },
  unbind (el) {
    $(el).dropdown('destroy')
  }
})

// Register a global custom directive called v-autosize
Vue.directive('autosize', {
  bind (el) {
    AutoSize($(el))
  },
  unbind (el) {
    AutoSize.destroy($(el))
  }
})

// Register a global custom directive called v-modal
Vue.directive('modal', {
  bind (el) {
    $(el).modal()
  },
  unbind (el) {
    $(el).modal('destroy')
  }
})

Vue.filter('capitalise', (text) => {
  return text[0].toUpperCase() + text.slice(1)
})

Vue.filter('formatDate', (value) => {
  var date = new Date(value)
  return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
})

console.log('NEWT!')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
