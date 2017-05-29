import Vue from 'vue'
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

  it('has correct note color and key', (done) => {
    const TEST_KEY = 'TestKey'
    const TEST_COLOR = 'purple'
    function assertions () {
      expect(this.noteColor).toBe(this.colors[TEST_COLOR])
      expect(this.key).toBe(TEST_KEY)
      done()
    }
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
    const stubbedStore = new Vuex.Store(testOptions)
    const mixin = {
      mounted () {
        Vue.nextTick()
          .then(assertions.bind(this))
          .catch(done)
      }
    }
    const Component = Vue.extend({ ...Note, store: stubbedStore, mixins: [mixin] })
    new Component({ propsData }).$mount()
  })

  fit('has correct note color and key', (done) => {
    const TEST_KEY = 'TestKey'
    const TEST_COLOR = 'purple'
    function assertions () {
      expect(this.noteColor).toBe(this.colors[TEST_COLOR])
      expect(this.key).toBe(TEST_KEY)
      done()
    }
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
    const stubbedStore = new Vuex.Store(testOptions)
    const mixin = {
      mounted () {
        Vue.nextTick()
          .then(assertions.bind(this))
          .catch(done)
      }
    }
    const Component = Vue.extend({ ...Note, store: stubbedStore, mixins: [mixin] })
    new Component({ propsData }).$mount()
  })

  it('has correct overflow gradient', (done) => {
    const TEST_COLOR = 'purple'
    function assertions () {
      expect(this.overflowGradient).toBe(`linear-gradient(transparent, ${this.noteColor})`)
      done()
    }
    const propsData = {
      note: {
        '.key': 'akey',
        checked: false,
        color: TEST_COLOR,
        created_at: '2016-08-20T04:38:10.082Z',
        markdown: false,
        text: 'Test text',
        title: 'Test title'
      }
    }
    const stubbedStore = new Vuex.Store(testOptions)
    const mixin = {
      mounted () {
        Vue.nextTick()
          .then(assertions.bind(this))
          .catch(done)
      }
    }
    const Component = Vue.extend({ ...Note, store: stubbedStore, mixins: [mixin] })
    new Component({ propsData }).$mount()
  })
})
