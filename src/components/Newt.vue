<template>
  <div id="newt">
    <navbar></navbar>
    <br>
    <div class="ui fluid container">
      <note-form></note-form>
      <notes></notes>
      <note-editor></note-editor>
    </div>
  </div>
</template>

<script>
import Hello from './Hello'
import Navbar from './Navbar'
import NoteForm from './NoteForm'
import Notes from './Notes'
import NoteEditor from './NoteEditor'

export default {
  name: 'newt',
  components: {
    Hello,
    Navbar,
    NoteForm,
    Notes,
    NoteEditor
  }
}
</script>

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
