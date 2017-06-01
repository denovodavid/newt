import { mount } from 'avoriaz'
import Vuex from 'vuex'
import '@/directives'
import '@/filters'
import cloneDeep from 'lodash/cloneDeep'
import { options } from '@/store'
import Note from '@/components/Note'

describe('Note', () => {
  let testOptions

  beforeEach(() => {
    testOptions = cloneDeep(options)
  })

  it('has the correct name', () => {
    expect(Note.name).toBe('note')
  })

  it('has correct default data', () => {
    expect(typeof Note.data).toBe('function')
    const defaultData = Note.data()
    expect(defaultData.overflow).toBe(false)
  })

  it('has correct note color and key', () => {
    const TEST_KEY = 'TestKey'
    const TEST_COLOR = 'purple'
    const propsData = {
      note: {
        '.key': TEST_KEY,
        checked: false,
        color: TEST_COLOR,
        created_at: '2016-08-20T04:38:10.082Z',
        markdown: false,
        text: 'Test text',
        title: 'Test title'
      }
    }
    const store = new Vuex.Store(testOptions)
    const wrapper = mount(Note, { store, propsData })
    expect(wrapper.vm.noteColor).toBe(wrapper.vm.colors[TEST_COLOR])
    expect(wrapper.vm.key).toBe(TEST_KEY)
  })
})
