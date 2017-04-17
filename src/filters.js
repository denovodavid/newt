import Vue from 'vue'

Vue.filter('capitalise', (text) => {
  return text[0].toUpperCase() + text.slice(1)
})

Vue.filter('formatDate', (value) => {
  var date = new Date(value)
  return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
})
