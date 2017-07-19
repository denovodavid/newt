import Vue from 'vue'

Vue.filter('capitalise', (text) => {
  return text[0].toUpperCase() + text.slice(1)
})
