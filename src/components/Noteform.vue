<template>
  <div class="ui text container">
    <form id="note-form" class="ui form" v-on:submit.prevent="createNote()">
      <div class="ui fluid card">
        <div class="content">
          <div class="ui large transparent left input fluid">
            <input id="note-title" type="text" placeholder="Title" v-model="newNote.title">
          </div>
          <div class="ui divider"></div>
          <div class="field">
            <textarea id="note-text" rows="3" placeholder="Take a note..." v-model="newNote.text" style="border: 0; padding: 0;"></textarea>
          </div>
        </div>
        <div class="extra content" v-bind:style="newNoteColor">
          <div class="compact ui icon dropdown circular basic tiny button" v-dropdown>
            <i class="icon theme"></i>
            <div class="menu">
              <div class="item" v-on:click="changeColor(color)" v-for="(hex, color) in colors">
                <div class="ui large empty circular label" v-bind:style="{ backgroundColor: hex }"></div>
                {{ color | capatalise }}
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
import Vue from 'vue'
import db from '../database.js'
import Colors from '../colors'
import AutoSize from 'autosize'

export default {
  name: 'noteform',
  data () {
    return {
      newNote: {
        title: '',
        text: '',
        markdown: false,
        color: 'none',
        created_at: ''
      },
      colors: Colors
    }
  },
  computed: {
    newNoteColor () {
      return {
        'background-color': Colors[this.newNote.color]
      }
    }
  },
  mounted () {
    AutoSize($('#note-text'))
  },
  beforeDestroy () {
    AutoSize.destroy($('#note-text'))
  },
  methods: {
    toggleMarkdown () {
      this.newNote.markdown = !this.newNote.markdown
    },
    changeColor (color) {
      this.newNote.color = color
    },
    createNote () {
      var self = this
      db.ref('notes').push({
        title: self.newNote.title.trim(),
        text: self.newNote.text.trim(),
        markdown: self.newNote.markdown,
        color: self.newNote.color,
        created_at: new Date().toJSON()
      }, () => {
        console.log('Note Created!')
        Vue.nextTick(() => {
          self.$emit('noteCreated')
        })
        self.newNote.title = self.newNote.text = ''
        $('#note-title').focus()
      })
    }
  }
}
</script>

<style></style>