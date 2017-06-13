import cloneDeep from 'lodash/cloneDeep'
import stateOptions from '@/store/state'
import mutationsOptions from '@/store/mutations'
import * as types from '@/store/mutation-types'

const mutations = cloneDeep(mutationsOptions)

describe('Mutations', () => {
  let state

  beforeEach(() => {
    state = cloneDeep(stateOptions)
  })

  it(types.NOTE_FORM, () => {
    const PAYLOAD = 'LOL'
    mutations[types.NOTE_FORM](state, PAYLOAD)
    expect(state.newNote).toBe(PAYLOAD)
  })

  it(types.NOTE_FORM_TEXT, () => {
    const PAYLOAD = 'Some Text'
    mutations[types.NOTE_FORM_TEXT](state, PAYLOAD)
    expect(state.newNote.text).toBe(PAYLOAD)
  })

  it(types.NOTE_FORM_COLOR, () => {
    const PAYLOAD = 'blue'
    mutations[types.NOTE_FORM_COLOR](state, PAYLOAD)
    expect(state.newNote.color).toBe(PAYLOAD)
  })

  it(types.NOTE_EDITOR, () => {
    const PAYLOAD = 'LOL'
    mutations[types.NOTE_EDITOR](state, PAYLOAD)
    expect(state.editor).toBe(PAYLOAD)
  })

  it(types.NOTE_EDITOR_TITLE, () => {
    const PAYLOAD = 'A Title'
    mutations[types.NOTE_EDITOR_TITLE](state, PAYLOAD)
    expect(state.editor.note.title).toBe(PAYLOAD)
  })

  it(types.NOTE_EDITOR_TEXT, () => {
    const PAYLOAD = 'Some Text'
    mutations[types.NOTE_EDITOR_TEXT](state, PAYLOAD)
    expect(state.editor.note.text).toBe(PAYLOAD)
  })

  it(types.NOTE_EDITOR_COLOR, () => {
    const PAYLOAD = 'blue'
    mutations[types.NOTE_EDITOR_COLOR](state, PAYLOAD)
    expect(state.editor.note.color).toBe(PAYLOAD)
  })

  it(types.NOTE_EDITOR_MARKDOWN, () => {
    const PAYLOAD = true
    mutations[types.NOTE_EDITOR_MARKDOWN](state, PAYLOAD)
    expect(state.editor.note.markdown).toBe(true)
  })
})
