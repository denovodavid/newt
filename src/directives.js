import Vue from 'vue'
import AutoSize from 'autosize'
import 'semantic-ui-css/components/dropdown'
import 'semantic-ui-css/components/transition'
import 'semantic-ui-css/components/modal'
import 'semantic-ui-css/components/dimmer'

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
