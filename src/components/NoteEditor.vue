<template>
  <div class="ui long modal"
       v-modal>
    <form id="edit-form"
          class="ui form"
          @submit.prevent="">
      <div class="ui fluid card">
        <div class="content">
          <div class="ui large transparent left input fluid">
            <input id="edit-title"
                   type="text"
                   placeholder="Title"
                   v-model.trim="title">
          </div>
          <div class="ui divider"></div>
          <div class="field">
            <textarea id="edit-text"
                      rows="3"
                      placeholder="Take a note..."
                      v-autosize
                      v-model.trim="text"></textarea>
          </div>
        </div>
        <div class="extra content"
             :style="{ backgroundColor: noteColor }">
          <div class="compact ui icon dropdown circular basic mini button"
               v-dropdown>
            <i class="icon theme"></i>
            <div class="menu">
              <div class="item"
                   v-for="(hex, color) in colors"
                   @click="NOTE_EDITOR_COLOR(color)">
                <div class="ui large empty circular label"
                     :style="{ backgroundColor: hex }"></div>
                {{ color | capitalise }}
              </div>
            </div>
          </div>
          <div class="right floated">
            <div class="ui icon basic tiny buttons compact">
              <button class="ui toggle button"
                      type="button"
                      @click="NOTE_EDITOR_MARKDOWN(!editor.note.markdown)"
                      :class="{ active: editor.note.markdown }">Markdown</button>
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
          <div class="ui ok bottom attached button"
               style="margin-left: 0;">Done</div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import AutoSize from 'autosize'
import { mapState, mapMutations, mapActions } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'noteeditor',
  computed: {
    title: {
      get () {
        return this.editor.note.title
      },
      set (value) {
        this.NOTE_EDITOR_TITLE(value)
      }
    },
    text: {
      get () {
        return this.editor.note.text
      },
      set (value) {
        this.NOTE_EDITOR_TEXT(value)
      }
    },
    noteColor () {
      return this.colors[this.editor.note.color]
    },
    ...mapState([
      'editor',
      'colors'
    ])
  },
  mounted () {
    const self = this
    $(self.$el).modal({
      onHidden: () => {
        self.updateNote(self.editor.note)
        self.NOTE_EDITOR({ note: {}, show: false })
      }
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
      } else {
        $(this.$el).modal('hide')
      }
    }
  },
  methods: {
    ...mapMutations([
      types.NOTE_EDITOR,
      types.NOTE_EDITOR_TITLE,
      types.NOTE_EDITOR_TEXT,
      types.NOTE_EDITOR_COLOR,
      types.NOTE_EDITOR_MARKDOWN
    ]),
    ...mapActions([
      'updateNote'
    ])
  }
}
</script>

<style scoped>
#edit-text {
  border: 0;
  padding: 0;
}
</style>
