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
import Navbar from './Navbar'
import NoteForm from './NoteForm'
import Notes from './Notes'
import NoteEditor from './NoteEditor'

export default {
  name: 'newt',
  components: {
    Navbar,
    NoteForm,
    Notes,
    NoteEditor
  }
}
</script>

<style src="semantic-ui-css/components/container.css"></style>
