import cloneDeep from 'lodash/cloneDeep'
import { options } from '@/store'
import * as types from '@/store/mutation-types'

const mutations = cloneDeep(options.mutations)

describe('Mutations', () => {
  let state

  beforeEach(() => {
    state = cloneDeep(options.state)
  })

  it(types.CLEAR_NOTE_FORM, () => {
    state.newNote.title = state.newNote.text = 'something'
    mutations[types.CLEAR_NOTE_FORM](state)
    expect(state.newNote.title).to.equal('')
    expect(state.newNote.text).to.equal('')
  })

  it(types.NOTE_FORM, () => {
    const PAYLOAD = 'LOL'
    mutations[types.NOTE_FORM](state, PAYLOAD)
    expect(state.newNote).to.equal(PAYLOAD)
  })

  it(types.NOTE_FORM_TITLE, () => {
    const PAYLOAD = 'A Title'
    mutations[types.NOTE_FORM_TITLE](state, PAYLOAD)
    expect(state.newNote.title).to.equal(PAYLOAD)
  })

  it(types.NOTE_FORM_TEXT, () => {
    const PAYLOAD = 'Some Text'
    mutations[types.NOTE_FORM_TEXT](state, PAYLOAD)
    expect(state.newNote.text).to.equal(PAYLOAD)
  })

  it(types.NOTE_FORM_COLOR, () => {
    const PAYLOAD = 'blue'
    mutations[types.NOTE_FORM_COLOR](state, PAYLOAD)
    expect(state.newNote.color).to.equal(PAYLOAD)
  })

  it(types.NOTE_FORM_MARKDOWN, () => {
    const PAYLOAD = true
    mutations[types.NOTE_FORM_MARKDOWN](state, PAYLOAD)
    expect(state.newNote.markdown).to.be.true
  })

  it(types.NOTE_EDITOR, () => {
    const PAYLOAD = 'LOL'
    mutations[types.NOTE_EDITOR](state, PAYLOAD)
    expect(state.editor).to.equal(PAYLOAD)
  })

  it(types.NOTE_EDITOR_TITLE, () => {
    const PAYLOAD = 'A Title'
    mutations[types.NOTE_EDITOR_TITLE](state, PAYLOAD)
    expect(state.editor.note.title).to.equal(PAYLOAD)
  })

  it(types.NOTE_EDITOR_TEXT, () => {
    const PAYLOAD = 'Some Text'
    mutations[types.NOTE_EDITOR_TEXT](state, PAYLOAD)
    expect(state.editor.note.text).to.equal(PAYLOAD)
  })

  it(types.NOTE_EDITOR_COLOR, () => {
    const PAYLOAD = 'blue'
    mutations[types.NOTE_EDITOR_COLOR](state, PAYLOAD)
    expect(state.editor.note.color).to.equal(PAYLOAD)
  })

  it(types.NOTE_EDITOR_MARKDOWN, () => {
    const PAYLOAD = true
    mutations[types.NOTE_EDITOR_MARKDOWN](state, PAYLOAD)
    expect(state.editor.note.markdown).to.be.true
  })
})
