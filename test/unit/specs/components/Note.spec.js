import { mount } from 'avoriaz'
import Vuex from 'vuex'
import '@/directives'
import '@/filters'
import cloneDeep from 'lodash/cloneDeep'
import { options } from '@/store'
import Note from '@/components/Note'

jest.mock('@/firebaseApp')

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

  it('has correct note color', () => {
    const TEST_COLOR = 'purple'
    const propsData = {
      note: {
        '.key': 'someKey',
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
  })
})
