<template>
  <div id="app">
    <div id="loader"
         class="ui top attached violet progress">
      <div class="bar"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as mutations from '@/store/mutation-types'
import 'semantic-ui-css/components/site'
import 'semantic-ui-css/components/progress'

export default {
  name: 'app',
  computed: {
    ...mapState([
      'loading'
    ])
  },
  mounted () {
    $('#loader').progress({
      onSuccess: () => {
        this.LOADING(0)
      }
    })
  },
  watch: {
    loading: function (value) {
      $('#loader').progress('set percent', value)
    }
  },
  methods: {
    ...mapMutations([
      mutations.LOADING
    ])
  }
}
</script>

<style src="semantic-ui-css/components/reset.css"></style>
<style src="semantic-ui-css/components/site.css"></style>
<style src="semantic-ui-css/components/progress.css"></style>
<style scoped>
.ui.progress.attached {
  position: fixed;
  width: 100%;
  opacity: 0;
  transition: opacity 0.2s;
}

.ui.progress.attached.active {
  opacity: 1;
}

.ui.progress.active .bar::after {
  display: none;
}

.ui.progress.attached.success {
  opacity: 0;
}
</style>
<style>
body {
  background: #f9f9f9 !important;
}

#newt {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
