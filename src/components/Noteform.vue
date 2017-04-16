<template>
<div class="ui text container">
  <form id="note-form" class="ui form" v-on:submit.prevent="createNote(newNote)">
    <div class="ui fluid card">
      <div class="content">
        <div class="ui large transparent left input fluid">
          <input id="note-title" type="text" placeholder="Title" v-model="newNote.title">
        </div>
        <div class="ui divider"></div>
        <div class="field">
          <textarea id="note-text" v-autosize rows="3" placeholder="Take a note..." v-model="newNote.text"></textarea>
        </div>
      </div>
      <div class="extra content" v-bind:style="newNoteColor">
        <div class="compact ui icon dropdown circular basic tiny button" v-dropdown>
          <i class="icon theme"></i>
          <div class="menu">
            <div class="item" v-on:click="changeColor(color)" v-for="(hex, color) in colors">
              <div class="ui large empty circular label" v-bind:style="{ backgroundColor: hex }"></div>
              {{ color | capitalise }}
            </div>
          </div>
        </div>
        <div class="right floated">
          <div class="ui icon basic tiny buttons compact">
            <button id="note-markdown" type="button" class="ui toggle button" v-on:click="toggleMarkdown()" v-bind:class="{ active: newNote.markdown }">Markdown</button>
            <!--<div class="ui icon dropdown button" v-dropdown>
                <i class="icon ellipsis vertical"></i>
                <div class="menu">
                  <div class="item">Option 1</div>
                  <div class="item">Option 2</div>
                  <div class="item">Option 3</div>
                </div>
              </div>-->
          </div>
        </div>
      </div>
      <button class="ui bottom attached button" type="submit">Done</button>
    </div>
  </form>
</div>
</template>

<script>
// import Vue from 'vue'
// import db from '../database.js'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'noteform',
  computed: {
    newNoteColor () {
      return {
        'background-color': this.colors[this.newNote.color]
      }
    },
    ...mapState([
      'newNote',
      'colors'
    ])
  },
  methods: {
    toggleMarkdown () {
      this.newNote.markdown = !this.newNote.markdown
    },
    changeColor (color) {
      this.newNote.color = color
    },
    // createNote () {
    //   var self = this
    //   db.ref('notes').push({
    //     title: self.newNote.title.trim(),
    //     text: self.newNote.text.trim(),
    //     markdown: self.newNote.markdown,
    //     color: self.newNote.color,
    //     created_at: new Date().toJSON()
    //   }, () => {
    //     console.log('Note Created!')
    //     Vue.nextTick(() => {
    //       self.$emit('noteCreated')
    //     })
    //     self.newNote.title = self.newNote.text = ''
    //     $('#note-title').focus()
    //   })
    // },
    ...mapActions([
      'createNote'
    ])
  }
}
</script>

<style scoped>
#note-text {
  border: 0;
  padding: 0;
}
</style>
