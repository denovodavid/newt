<template>
<div class="ui yellow inverted borderless menu" style="border-radius: 0;">
  <div class="grey item" style="color: #222 !important;">
    <h3>Newt</h3>
  </div>
  <!--<a class="item" style="color: #222 !important;">Vue</a>-->
  <!-- <a class="item disabled" style="color: #222 !important; text-decoration: line-through;">Angular</a>
    <a class="item disabled" style="color: #222 !important; text-decoration: line-through;">React</a>
    <a class="item disabled" style="color: #222 !important; text-decoration: line-through;">Ember</a>
    <a class="item disabled" style="color: #222 !important; text-decoration: line-through;">Meteor</a> -->
  <div class="right menu">
      <!--<div class="ui item">
        <i id="loading-icon" class="icon large checkmark" style="color: #222 !important;"></i>
      </div>-->
      <a class="item" v-on:click="handleSignOut()">Sign Out</a>
    </div>
</div>
</template>

<script>
import { firebaseApp } from '../firebase'

export default {
  name: 'navbar',
  methods: {
    handleSignOut () {
      firebaseApp.auth().signOut()
    }
  }
}
</script>

<style src="semantic-ui-css/components/menu.min.css"></style>
<style scoped>
.ui.inverted.menu .item {
  color: #444;
}

.ui.inverted.menu .item:hover {
  color: #000;
}
</style>
