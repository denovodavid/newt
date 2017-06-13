import { firebaseMutations } from 'vuexfire'
import * as types from './mutation-types'

export default {
  [types.ROUTE_LOADING] (state, percent) {
    state.routeLoading = percent
  },
  [types.ASYNC_LOADING] (state, isLoading) {
    state.asyncLoading = isLoading
  },
  [types.NOTE_FORM] (state, payload) {
    state.newNote = payload
  },
  [types.NOTE_FORM_TEXT] (state, text) {
    state.newNote.text = text
  },
  [types.NOTE_FORM_COLOR] (state, color) {
    state.newNote.color = color
  },
  [types.NOTE_EDITOR] (state, payload) {
    state.editor = payload
  },
  [types.NOTE_EDITOR_TITLE] (state, title) {
    state.editor.note.title = title
  },
  [types.NOTE_EDITOR_TEXT] (state, text) {
    state.editor.note.text = text
  },
  [types.NOTE_EDITOR_COLOR] (state, color) {
    state.editor.note.color = color
  },
  [types.NOTE_EDITOR_MARKDOWN] (state, markdown) {
    state.editor.note.markdown = markdown
  },
  ...firebaseMutations
}
