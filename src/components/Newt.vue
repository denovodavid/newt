<template>
  <div id="newt">
    <navbar></navbar>
    <br>
    <div class="ui fluid container">
      <note-form></note-form>
      <!-- <notes></notes> -->
      <water-wall-notes></water-wall-notes>
      <note-editor></note-editor>
    </div>
  </div>
</template>

<script>
import Hello from './Hello'
import Navbar from './Navbar'
import NoteForm from './NoteForm'
import Notes from './Notes'
import WaterWallNotes from './WaterWallNotes'
import NoteEditor from './NoteEditor'

export default {
  name: 'newt',
  components: {
    Hello,
    Navbar,
    NoteForm,
    Notes,
    WaterWallNotes,
    NoteEditor
  }
}
</script>

<style src="semantic-ui-css/components/container.css"></style>
