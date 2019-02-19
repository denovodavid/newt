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

  it(types.NOTE_EDITOR_SHOW, () => {
    const PAYLOAD = true
    mutations[types.NOTE_EDITOR_SHOW](state, PAYLOAD)
    expect(state.editor.show).toBe(PAYLOAD)
  })

  it(types.NOTE_EDITOR_NOTE, () => {
    const PAYLOAD = 'NEWT'
    mutations[types.NOTE_EDITOR_NOTE](state, PAYLOAD)
    expect(state.editor.note).toBe(PAYLOAD)
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
})
