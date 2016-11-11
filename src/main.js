import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import db from './firebaseDatabase'

import 'jquery-ui/jquery-ui.min.js'

import 'jquery.ns-autogrow'

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
  components: { App },
  data: {
    db: db,
    colors: {
      none: '',
      red: '#ff8a80',
      orange: '#ffd180',
      yellow: '#ffff8d',
      green: '#ccff90',
      teal: '#a7ffeb',
      blue: '#80d8ff',
      purple: '#b680ff',
      pink: '#ff80ef',
      grey: '#cfd8dc'
    }
  }
})
