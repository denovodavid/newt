<template>
  <div class="ui container">
    <form id="note-form"
          class="ui form"
          @submit.prevent="createNote(newNote)">
      <div class="field">
        <textarea id="note-text"
                  rows="1"
                  placeholder="Take a note..."
                  v-autosize
                  v-model.trim="text"></textarea>
      </div>
      <div class="ui basic clearing segment">
          <button id="post-note"
                class="ui right floated button"
                type="submit">Done</button>
          <div class="ui right floated dropdown button"
              v-dropdown
              :style="newNoteColor">
            Color
            <div class="menu">
              <div class="item"
                  v-for="(hex, color) in colors"
                  @click="NOTE_FORM_COLOR(color)">
                <div class="ui large empty circular label"
                    :style="{ backgroundColor: hex }"></div>
                {{ color | capitalise }}
              </div>
            </div>
          </div>
        </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import autosize from 'autosize'
import * as mutations from '../store/mutation-types'
import 'semantic-ui-css/components/form'
import 'semantic-ui-css/components/transition'

export default {
  name: 'noteform',
  computed: {
    title: {
      get () {
        return this.newNote.title
      },
      set (value) {
        this.NOTE_FORM_TITLE(value)
      }
    },
    text: {
      get () {
        return this.newNote.text
      },
      set (value) {
        this.NOTE_FORM_TEXT(value)
      }
    },
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
  watch: {
    newNote: {
      handler () {
        Vue.nextTick(() => {
          autosize.update($('#note-text'))
        })
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations([
      mutations.NOTE_FORM_TITLE,
      mutations.NOTE_FORM_TEXT,
      mutations.NOTE_FORM_COLOR,
      mutations.NOTE_FORM_MARKDOWN
    ]),
    ...mapActions([
      'createNote'
    ])
  }
}
</script>

<style src="semantic-ui-css/components/icon.css"></style>
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
<style src="semantic-ui-css/components/segment.css"></style>
<style scoped>
#note-text {
  font-size: 2em;
  background: none;
  border: 0;
  padding: 0;
  resize: none;
}

.ui.basic.clearing.segment {
  padding: 0;
}

.ui.button {
  background: none;
}

.ui.button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.ui.button:active {
  background: none;
}

.ui.button.button {
  margin-left: 1em;
  margin-right: 1em;
}

#post-note {
  margin-right: 0;
}
</style>
