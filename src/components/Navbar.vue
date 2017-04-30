<template>
<div class="ui yellow inverted borderless menu"
     style="border-radius: 0;">
  <div class="grey item"
       style="color: #222 !important;">
    <h3>Newt</h3>
  </div>
  <!--<a class="item" style="color: #222 !important;">Vue</a>-->
  <!-- <a class="item disabled" style="color: #222 !important; text-decoration: line-through;">Angular</a>
    <a class="item disabled" style="color: #222 !important; text-decoration: line-through;">React</a>
    <a class="item disabled" style="color: #222 !important; text-decoration: line-through;">Ember</a>
    <a class="item disabled" style="color: #222 !important; text-decoration: line-through;">Meteor</a> -->
  <div class="right menu">
      <a class="item"
         @click="handleSignOut()">Sign Out</a>
      <transition name="fade"
                  mode="out-in">
        <div class="ui item"
             style="color: #222 !important;"
             v-if="asyncLoading"
             :key="asyncLoading">
          <i class="notched circle loading icon large"></i>
        </div>
        <div class="ui item"
             style="color: #222 !important;"
             v-else
             :key="asyncLoading">
          <i class="checkmark icon large"></i>
        </div>
      </transition>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { firebaseApp } from '../firebase'

export default {
  name: 'navbar',
  computed: {
    ...mapState([
      'asyncLoading'
    ])
  },
  methods: {
    handleSignOut () {
      firebaseApp.auth().signOut()
    }
  }
}
</script>

<style src="semantic-ui-css/components/icon.css"></style>
<style src="semantic-ui-css/components/menu.css"></style>
<style scoped>
.ui.inverted.menu .item {
  color: #444;
}

.ui.inverted.menu .item:hover {
  color: #000;
}

.fade-enter-active.fade-enter-active.fade-enter-active, .fade-leave-active.fade-leave-active.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter.fade-enter.fade-enter, .fade-leave-to.fade-leave-to.fade-leave-to {
  opacity: 0;
}
</style>
