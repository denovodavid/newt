import cloneDeep from 'lodash/cloneDeep'
import stateOptions from '../../../../src/store/state'
import mutationsOptions from '../../../../src/store/mutations'
import * as types from '../../../../src/store/mutation-types'

const mutations = cloneDeep(mutationsOptions)

describe('Mutations', () => {
  let state

  beforeEach(() => {
    state = cloneDeep(stateOptions)
  })

  xit(types.CLEAR_NOTE_FORM, () => {
    state.newNote.title = state.newNote.text = 'something'
    mutations[types.CLEAR_NOTE_FORM](state)
    expect(state.newNote.title).toBe('')
    expect(state.newNote.text).toBe('')
  })

  xit(types.NOTE_FORM, () => {
    const PAYLOAD = 'LOL'
    mutations[types.NOTE_FORM](state, PAYLOAD)
    expect(state.newNote).toBe(PAYLOAD)
  })

  xit(types.NOTE_FORM_TITLE, () => {
    const PAYLOAD = 'A Title'
    mutations[types.NOTE_FORM_TITLE](state, PAYLOAD)
    expect(state.newNote.title).toBe(PAYLOAD)
  })

  xit(types.NOTE_FORM_TEXT, () => {
    const PAYLOAD = 'Some Text'
    mutations[types.NOTE_FORM_TEXT](state, PAYLOAD)
    expect(state.newNote.text).toBe(PAYLOAD)
  })

  xit(types.NOTE_FORM_COLOR, () => {
    const PAYLOAD = 'blue'
    mutations[types.NOTE_FORM_COLOR](state, PAYLOAD)
    expect(state.newNote.color).toBe(PAYLOAD)
  })

  xit(types.NOTE_FORM_MARKDOWN, () => {
    const PAYLOAD = true
    mutations[types.NOTE_FORM_MARKDOWN](state, PAYLOAD)
    expect(state.newNote.markdown).toBe(true)
  })

  xit(types.NOTE_EDITOR, () => {
    const PAYLOAD = 'LOL'
    mutations[types.NOTE_EDITOR](state, PAYLOAD)
    expect(state.editor).toBe(PAYLOAD)
  })

  xit(types.NOTE_EDITOR_TITLE, () => {
    const PAYLOAD = 'A Title'
    mutations[types.NOTE_EDITOR_TITLE](state, PAYLOAD)
    expect(state.editor.note.title).toBe(PAYLOAD)
  })

  xit(types.NOTE_EDITOR_TEXT, () => {
    const PAYLOAD = 'Some Text'
    mutations[types.NOTE_EDITOR_TEXT](state, PAYLOAD)
    expect(state.editor.note.text).toBe(PAYLOAD)
  })

  xit(types.NOTE_EDITOR_COLOR, () => {
    const PAYLOAD = 'blue'
    mutations[types.NOTE_EDITOR_COLOR](state, PAYLOAD)
    expect(state.editor.note.color).toBe(PAYLOAD)
  })

  xit(types.NOTE_EDITOR_MARKDOWN, () => {
    const PAYLOAD = true
    mutations[types.NOTE_EDITOR_MARKDOWN](state, PAYLOAD)
    expect(state.editor.note.markdown).toBe(true)
  })
})
