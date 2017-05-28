import Vuex from 'vuex'
import { mount } from 'avoriaz'
import cloneDeep from 'lodash/cloneDeep'
import '@/directives'
import '@/filters'
import { options } from '@/store'
import Testing from '@/components/Testing'

// THIS HELPED A LOT
// https://github.com/johnnynotsolucky/samples/blob/master/vuejs-sample-1/test/unit/specs/List.spec.js

describe('Testing', () => {
  let testOptions

  beforeEach(() => {
    testOptions = cloneDeep(options)
    testOptions.strict = false
  })

  it('has the correct name', () => {
    expect(Testing.name).toBe('testing')
  })

  it('has dependable mutations', () => {
    const TEST_TITLE = 'Test Title'
    const TEST_TEXT = 'Test Text'
    const store = new Vuex.Store(testOptions)
    const wrapper = mount(Testing, { store })
    wrapper.vm.title = TEST_TITLE
    wrapper.vm.text = TEST_TEXT
    expect(wrapper.vm.title).toBe(TEST_TITLE)
    expect(wrapper.vm.text).toBe(TEST_TEXT)
  })

  it('calls store action createNote when button is clicked', () => {
    // mock our selected function
    testOptions.actions.createNote = jest.fn()
    const store = new Vuex.Store(testOptions)
    const wrapper = mount(Testing, { store })
    wrapper.find('button[type=submit]')[0].dispatch('click')
    expect(testOptions.actions.createNote).toBeCalled()
  })

  it('has active class on markdown button when markdown is true', () => {
    testOptions.state.newNote.markdown = true
    const store = new Vuex.Store(testOptions)
    const wrapper = mount(Testing, { store })
    expect(wrapper.find('#note-markdown')[0].hasClass('active')).toBe(true)
  })

  it('returns correct note color', () => {
    testOptions.state.newNote.color = 'red'
    const store = new Vuex.Store(testOptions)
    const wrapper = mount(Testing, { store })
    expect(wrapper.vm.newNoteColor).toEqual({
      'background-color': wrapper.vm.colors[testOptions.state.newNote.color]
    })
  })
})
