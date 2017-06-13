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
  [types.NOTE_EDITOR_SHOW] (state, payload) {
    state.editor.show = payload
  },
  [types.NOTE_EDITOR_NOTE] (state, payload) {
    state.editor.note = payload
  },
  [types.NOTE_EDITOR_TEXT] (state, text) {
    state.editor.note.text = text
  },
  [types.NOTE_EDITOR_COLOR] (state, color) {
    state.editor.note.color = color
  },
  ...firebaseMutations
}
