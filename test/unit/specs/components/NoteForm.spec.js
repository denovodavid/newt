import Vuex from 'vuex'
import { mount } from 'avoriaz'
import cloneDeep from 'lodash/cloneDeep'
import '@/directives'
import '@/filters'
import { options } from '@/store'
import NoteForm from '@/components/NoteForm'

jest.mock('@/firebaseApp')

describe('NoteForm', () => {
  let testOptions

  beforeEach(() => {
    testOptions = cloneDeep(options)
  })

  it('has the correct name', () => {
    expect(NoteForm.name).toBe('noteform')
  })

  it('has dependable mutations', () => {
    const TEST_TITLE = 'Test Title'
    const TEST_TEXT = 'Test Text'
    const store = new Vuex.Store(testOptions)
    const wrapper = mount(NoteForm, { store })
    wrapper.vm.title = TEST_TITLE
    wrapper.vm.text = TEST_TEXT
    expect(wrapper.vm.title).toBe(TEST_TITLE)
    expect(wrapper.vm.text).toBe(TEST_TEXT)
  })

  it('calls store action createNote when button is clicked', () => {
    // mock our selected function
    testOptions.actions.createNote = jest.fn()
    const store = new Vuex.Store(testOptions)
    const wrapper = mount(NoteForm, { store })
    wrapper.find('button[type=submit]')[0].dispatch('click')
    expect(testOptions.actions.createNote).toBeCalled()
  })

  it('returns correct note color', () => {
    testOptions.state.newNote.color = 'red'
    const store = new Vuex.Store(testOptions)
    const wrapper = mount(NoteForm, { store })
    expect(wrapper.vm.newNoteColor).toEqual({
      'background-color': wrapper.vm.colors[testOptions.state.newNote.color]
    })
  })
})
