<template>
<div id="app">
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
import Hello from './components/Hello'
import Navbar from './components/Navbar'
import Noteform from './components/Noteform'
import Notes from './components/Notes'
import Noteeditor from './components/NoteEditor'

export default {
  name: 'app',
  components: {
    Hello,
    Navbar,
    Noteform,
    Notes,
    Noteeditor
  },
  data() {
    return {
      editor: {
        show: false,
        note: {}
      }
    }
  },
  methods: {
    editNote(note) {
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

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
