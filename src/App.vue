<template>
  <div id="app">
    <div id="loader"
         class="ui top attached violet progress">
      <div class="bar"></div>
    </div>
    <router-view/>
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
      mutations.ROUTE_LOADING
    ])
  }
}
</script>

<style src="semantic-ui-css/components/reset.css"></style>
<style src="semantic-ui-css/components/site.css"></style>
<style src="semantic-ui-css/components/progress.css"></style>
<style src="noty/lib/noty.css"></style>
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

#noty_layout__topRight {
  top: 60px;
}

.noty_effects_open {
  opacity: 0;
  transform: translate(0, -50%);
  animation: noty_anim_in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.noty_effects_close {
  animation: noty_anim_out 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes noty_anim_in {
  100% {
    transform: translate(0);
    opacity: 1;
  }
}

@keyframes noty_anim_out {
  100% {
    transform: translate(50%);
    opacity: 0;
  }
}

.noty_theme__mint.noty_bar {
  margin: 4px 0;
  overflow: hidden;
  border-radius: 2px;
  position: relative;
  box-shadow: 0px 2px 4px 0px rgba(34, 36, 38, 0.12),
              0px 2px 10px 0px rgba(34, 36, 38, 0.15)
}

.noty_theme__mint.noty_bar .noty_body {
  padding: 10px;
  font-size: 14px;
}

.noty_theme__mint.noty_bar .noty_buttons {
  padding: 10px;
}

.noty_theme__mint.noty_type__alert,
.noty_theme__mint.noty_type__notification {
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  color: #2F2F2F;
}

.noty_theme__mint.noty_type__warning {
  background-color: #ffd180;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  color: #2F2F2F;
}

.noty_theme__mint.noty_type__error {
  background-color: #ff8a80;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  color: #2F2F2F;
}

.noty_theme__mint.noty_type__info,
.noty_theme__mint.noty_type__information {
  background-color: #80d8ff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  color: #2F2F2F;
}

.noty_theme__mint.noty_type__success {
  background-color: #ccff90;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  color: #2F2F2F;
}

</style>
