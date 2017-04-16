// import Vue from 'vue'
import { firebaseMutations } from 'vuexfire'
import * as types from './mutation-types'

export default {
  [types.EDIT_NOTE] (state, payload) {
    state.editor = payload
  },
  [types.EDIT_NOTE_COLOR] (state, color) {
    state.editor.note.color = color
  },
  [types.EDIT_NOTE_MARKDOWN] (state, markdown) {
    state.editor.note.markdown = markdown
  },
  [types.CLEAR_NOTE_FORM] (state) {
    state.newNote.title = state.newNote.text = ''
  },
  [types.NOTEFORM_TITLE] (state, title) {
    state.newNote.title = title
  },
  [types.NOTEFORM_TEXT] (state, text) {
    state.newNote.text = text
  },
  [types.NOTEFORM_COLOR] (state, color) {
    state.newNote.color = color
  },
  [types.NOTEFORM_MARKDOWN] (state, markdown) {
    state.newNote.markdown = markdown
  },
  ...firebaseMutations
}
