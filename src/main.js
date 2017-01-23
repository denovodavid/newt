import Vue from 'vue'
import VueFire from 'vuefire'

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
  bind(el) {
    $(el).dropdown()
  },
  unbind(el) {
    $(el).dropdown('destroy')
  }
})

// Register a global custom directive called v-autosize
Vue.directive('autosize', {
  bind(el) {
    AutoSize($(el))
  },
  unbind(el) {
    AutoSize.destroy($(el))
  }
})

// Register a global custom directive called v-modal
Vue.directive('modal', {
  bind(el) {
    $(el).modal()
  },
  unbind(el) {
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

import App from './App'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
})
