<template>
  <div class="ui text container">
    <form id="note-form"
          class="ui form"
          @submit.prevent="createNote(newNote)">
      <div class="ui fluid card">
        <div class="content">
          <div class="ui large transparent left input fluid">
            <input id="note-title"
                   type="text"
                   placeholder="Title"
                   v-model.trim="title">
          </div>
          <div class="ui divider"></div>
          <div class="field">
            <textarea id="note-text"
                      rows="3"
                      placeholder="Take a note..."
                      v-autosize
                      v-model.trim="text"></textarea>
          </div>
        </div>
        <div class="extra content"
             :style="newNoteColor">
          <div class="compact ui icon dropdown circular basic tiny button"
               v-dropdown>
            <i class="icon theme"></i>
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
          <div class="right floated">
            <div class="ui icon basic tiny buttons compact">
              <button id="note-markdown"
                      type="button"
                      class="ui toggle button"
                      :class="{ active: newNote.markdown }"
                      @click="NOTE_FORM_MARKDOWN(!newNote.markdown)">Markdown</button>
              <!--<div class="ui icon dropdown button"
                   v-dropdown>
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
        <button class="ui bottom attached button"
                type="submit">Done</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as mutations from '../store/mutation-types'
import 'semantic-ui-css/components/form'

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

<style src="semantic-ui-css/components/container.css"></style>
<style src="semantic-ui-css/components/form.css"></style>
<style src="semantic-ui-css/components/card.css"></style>
<style src="semantic-ui-css/components/input.css"></style>
<style src="semantic-ui-css/components/divider.css"></style>
<style src="semantic-ui-css/components/dropdown.css"></style>
<style src="semantic-ui-css/components/button.css"></style>
<style src="semantic-ui-css/components/menu.css"></style>
<style src="semantic-ui-css/components/label.css"></style>
<style scoped>
#note-text {
  border: 0;
  padding: 0;
}
</style>
