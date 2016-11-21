<template>
  <div class="ui small modal" v-modal>
    <form id="edit-form" class="ui form" v-on:submit.prevent="">
      <div class="ui fluid card">
        <div class="content">
          <div class="ui large transparent left input fluid">
            <input id="edit-title" type="text" placeholder="Title" v-model="editor.note.title">
          </div>
          <div class="ui divider"></div>
          <div class="field">
            <textarea id="edit-text" placeholder="Take a note..." style="border: 0; padding: 0;" v-model="editor.note.text" v-autosize="editor.note.text"></textarea>
          </div>
        </div>
        <div class="extra content" v-bind:style="noteColor">
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
              <button class="ui toggle button" type="button" v-on:click="toggleMarkdown()" v-bind:class="{ active: editor.note.markdown }">Markdown</button>
              <!--<div class="ui icon dropdown button">
                <i class="icon ellipsis vertical"></i>
                <div class="menu">
                  <div class="item">Delete note</div>
                  <div class="item">Add label</div>
                  <div class="item">Make a copy</div>
                </div>
              </div>-->
            </div>
          </div>
        </div>
        <div class="actions">
          <div class="ui ok bottom attached button" style="margin-left: 0;">Done</div>
        </div>
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
  name: 'noteeditor',
  props: ['editor'],
  data () {
    return {
      colors: Colors
    }
  },
  computed: {
    noteColor () {
      return {
        'background-color': Colors[this.editor.note.color]
      }
    }
  },
  mounted () {
    // var self = this
    // $(self.$el).modal({
    //   onHidden: self.vm.editorSaveNote
    // });
  },
  beforeDestroy () {
  },
  watch: {
    editor () {
      console.log('EDITOR')
      if (this.editor.show) {
        $(this.$el).modal('show')
        Vue.nextTick(() => {
          AutoSize.update($('#edit-text'))
        })
      }
    }
  },
  methods: {
    toggleMarkdown () {
      // this.newNote.markdown = !this.newNote.markdown
    },
    changeColor (color) {
      // this.newNote.color = color
    },
    updateNote () {
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

<style scoped>

</style>