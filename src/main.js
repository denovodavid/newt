import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'

import 'jquery-ui/jquery-ui.min.js'

import imagesLoaded from 'imagesloaded'
imagesLoaded.makeJQueryPlugin($)

import 'semantic-ui-css/semantic.js'
import 'semantic-ui-css/semantic.css'

// import marked from 'marked'

import 'jquery-shapeshift'

Vue.use(VueFire)

console.log('NEWT!')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
  }
})
