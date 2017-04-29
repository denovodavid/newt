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
      <a class="item" v-on:click="handleSignOut()">Sign Out</a>
      <div class="ui item">
        <i id="loading-icon" :class="isLoading" class="icon large" style="color: #222 !important;"></i>
      </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { firebaseApp } from '../firebase'

export default {
  name: 'navbar',
  computed: {
    isLoading () {
      return {
        checkmark: !this.asyncLoading,
        'notched circle loading': this.asyncLoading
      }
    },
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

<style src="semantic-ui-css/components/menu.css"></style>
<style scoped>
.ui.inverted.menu .item {
  color: #444;
}

.ui.inverted.menu .item:hover {
  color: #000;
}
</style>
