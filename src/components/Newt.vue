<template>
  <div id="newt">
    <navbar></navbar>
    <br>
    <div class="ui fluid container">
      <noteform></noteform>
      <notes></notes>
      <noteeditor></noteeditor>
    </div>
  </div>
</template>

<script>
import Hello from './Hello'
import Navbar from './Navbar'
import Noteform from './NoteForm'
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
