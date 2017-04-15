<template>
<div id="newt">
  <navbar></navbar>
  <br>
  <div class="ui fluid container">
    <noteform></noteform>
    <notes v-on:editnote="editNote($event)"></notes>
    <noteeditor></noteeditor>
  </div>
</div>
</template>

<script>
import Hello from './Hello'
import Navbar from './Navbar'
import Noteform from './Noteform'
import Notes from './Notes'
import Noteeditor from './NoteEditor'
// import { mapState, mapMutations } from 'vuex'
// import * as types from '../store/mutation-types'

export default {
  name: 'newt',
  components: {
    Hello,
    Navbar,
    Noteform,
    Notes,
    Noteeditor
  // },
  // computed: {
  //   ...mapState([
  //     'editor'
  //   ])
  }
}
</script>

<style>
body {
  background: #eee;
}

#newt {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
