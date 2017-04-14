<template>
<div class="ui long modal" v-modal>
  <form id="edit-form" class="ui form" v-on:submit.prevent="">
    <div class="ui fluid card">
      <div class="content">
        <div class="ui large transparent left input fluid">
          <input id="edit-title" type="text" placeholder="Title" v-model="editor.note.title">
        </div>
        <div class="ui divider"></div>
        <div class="field">
          <textarea id="edit-text" v-autosize rows="3" placeholder="Take a note..." v-model="editor.note.text"></textarea>
        </div>
      </div>
      <div class="extra content" v-bind:style="{ backgroundColor: noteColor }">
        <div class="compact ui icon dropdown circular basic mini button" v-dropdown>
          <i class="icon theme"></i>
          <div class="menu">
            <div class="item" v-for="(hex, color) in colors" v-on:click="setNoteColor(color)">
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
      return Colors[this.editor.note.color]
    }
  },
  mounted () {
    var self = this
    $(self.$el).modal({
      onHidden: self.updateNote
    })
    $('#edit-text').on('autosize:resized', () => {
      $(this.$el).modal('refresh')
    })
  },
  beforeDestroy () {},
  watch: {
    editor () {
      console.log('EDITOR')
      if (this.editor.show) {
        $(this.$el).modal('show')
        Vue.nextTick(() => {
          AutoSize.update($('#edit-text'))
          $(this.$el).modal('refresh')
        })
      }
    }
  },
  methods: {
    updateNote () {
      var self = this
      var key = self.editor.note['.key']
      db.ref('notes').child(key).update({
        title: self.editor.note.title.trim(),
        text: self.editor.note.text.trim(),
        markdown: self.editor.note.markdown,
        color: self.editor.note.color
      }, () => {
        console.log('Note Updated!')
        Vue.nextTick(() => {
          self.$emit('noteUpdated')
        })
      })
    },
    setNoteColor (color) {
      this.editor.note.color = color
    },
    toggleMarkdown () {
      this.editor.note.markdown = !this.editor.note.markdown
    }
  }
}
</script>

<style scoped>
#edit-text {
  border: 0;
  padding: 0;
}
</style>
