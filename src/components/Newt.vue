<template>
<div id="newt">
  <navbar></navbar>
  <br>
  <div class="ui fluid container">
    <noteform></noteform>
    <notes v-on:editnote="editNote($event)"></notes>
    <noteeditor v-bind:editor="editor"></noteeditor>
  </div>
</div>
</template>

<script>
import Hello from './Hello'
import Navbar from './Navbar'
import Noteform from './Noteform'
import Notes from './Notes'
import Noteeditor from './NoteEditor'

export default {
  name: 'newt',
  components: {
    Hello,
    Navbar,
    Noteform,
    Notes,
    Noteeditor
  },
  data () {
    return {
      editor: {
        show: false,
        note: {}
      }
    }
  },
  methods: {
    editNote (note) {
      this.editor = {
        show: true,
        note: note
      }
    }
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
