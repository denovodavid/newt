<template>
  <div id="note-editor"
       class="ui long large basic modal"
       v-modal>
    <div class="content">
      <form id="edit-form"
            class="ui form"
            @submit.prevent="null">
        <div class="field">
          <textarea id="edit-text"
                    rows="1"
                    placeholder="Take a note..."
                    v-autosize
                    v-model.trim="text"></textarea>
        </div>
      </form>
    </div>
    <div class="actions">
      <div class="ui dropdown button"
           v-dropdown>
        Color
        <div class="menu">
          <div class="item"
              v-for="(hex, color) in colors"
              :key="color"
              @click="NOTE_EDITOR_COLOR(color)">
            <div class="ui large empty circular label"
                :style="{ backgroundColor: hex }"></div>
            {{ color | capitalise }}
          </div>
        </div>
      </div>
      <div class="ui ok button">Done</div>
    </div>
    <div class="note-markdown"
         v-html="markdown(editor.note.text)"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import AutoSize from 'autosize'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import * as types from '../store/mutation-types'
import 'semantic-ui-css/components/form'
import 'semantic-ui-css/components/modal'
import 'semantic-ui-css/components/transition'

export default {
  name: 'noteeditor',
  computed: {
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
    ]),
    ...mapGetters([
      'markdown'
    ])
  },
  mounted () {
    const self = this
    $(self.$el).modal({
      onHidden: () => {
        self.updateNote(self.editor.note)
        self.NOTE_EDITOR_SHOW(false)
      },
      // observeChanges: true,
      closable: false,
      dimmerSettings: {
        variation: 'inverted',
        opacity: 1
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
    },
    noteColor () {
      $('body > .ui.dimmer').css('background-color', this.noteColor)
    }
  },
  methods: {
    ...mapMutations([
      types.NOTE_EDITOR_SHOW,
      types.NOTE_EDITOR_NOTE,
      types.NOTE_EDITOR_TEXT,
      types.NOTE_EDITOR_COLOR
    ]),
    ...mapActions([
      'updateNote'
    ])
  }
}
</script>

<style src="semantic-ui-css/components/icon.css"></style>
<style src="semantic-ui-css/components/modal.css"></style>
<style src="semantic-ui-css/components/dimmer.css"></style>
<style src="semantic-ui-css/components/container.css"></style>
<style src="semantic-ui-css/components/form.css"></style>
<style src="semantic-ui-css/components/card.css"></style>
<style src="semantic-ui-css/components/input.css"></style>
<style src="semantic-ui-css/components/divider.css"></style>
<style src="semantic-ui-css/components/dropdown.css"></style>
<style src="semantic-ui-css/components/button.css"></style>
<style src="semantic-ui-css/components/menu.css"></style>
<style src="semantic-ui-css/components/transition.css"></style>
<style src="semantic-ui-css/components/label.css"></style>
<style scoped>
#edit-text {
  font-size: 2em;
  background: none;
  border: 0;
  padding: 0;
  resize: none;
}

.ui.long.large.basic.modal {
  top: 0;
  margin-top: 63px !important;
  color: inherit;
}

.ui.modal > .actions {
  border: 0;
}

.ui.basic.clearing.segment {
  padding: 0;
}

.ui.button {
  background: none;
}

.ui.button:focus {
  background: rgba(0, 0, 0, 0.05);
}

.ui.button:hover, ui.active.button:hover {
  background-color: rgba(0, 0, 0, 0.05) !important;
  background: rgba(0, 0, 0, 0.05);
}

.ui.button:active {
  background: none;
}

.ui.button.button {
  margin-left: 1em;
  margin-right: 1em;
}

.note-markdown {
  word-wrap: break-word;
}

#post-note {
  margin-right: 0;
}
</style>

<style>
#note-editor .emoji {
  height: 1.3em;
}

#note-editor .ui.image {
  max-width: 100%;
  max-height: 100%;
}

#note-editor pre {
  background: rgba(250, 250, 250, 0.5);
  border-radius: 4px;
  padding: 0.5em;
  white-space: pre-wrap;
}

#note-editor code {
  font-family: 'Fira Code';
  font-feature-settings: "calt" 1;
  font-variant-ligatures: contextual;
}
</style>
