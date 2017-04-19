import Vue from 'vue'
import Vuex from 'vuex'
import '@/directives'
import '@/filters'
import cloneDeep from 'lodash/cloneDeep'
import { options } from '@/store'
import Note from '@/components/Note'
import 'semantic-ui-css/semantic.js'
import 'semantic-ui-css/semantic.css'

describe('Note', () => {
  let testOptions

  beforeEach(() => {
    testOptions = cloneDeep(options)
  })

  it('has the correct name', () => {
    expect(Note.name).to.equal('note')
  })

  it('has correct default data', () => {
    expect(Note.data).to.be.a('function')
    const defaultData = Note.data()
    expect(defaultData.overflow).to.be.false
  })

  it('has correct note color and key', (done) => {
    const TEST_KEY = 'TestKey'
    const TEST_COLOR = 'purple'
    function assertions () {
      expect(this.noteColor).to.equal(this.colors[TEST_COLOR])
      expect(this.key).to.equal(TEST_KEY)
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

  it.skip('has correct overflow gradient', (done) => {
    const TEST_COLOR_1 = ''
    const TEST_COLOR_2 = 'purple'
    function mountedAssertions () {
      expect(this.overflowGradient).to.equal('linear-gradient(transparent, #fff)')
      this.note.color = TEST_COLOR_2
    }
    function updatedAssertions () {
      expect(this.overflowGradient).to.equal('linear-gradient(transparent, ' + this.noteColor + ')')
      done()
    }
    const propsData = {
      note: {
        '.key': 'akey',
        checked: false,
        color: TEST_COLOR_1,
        created_at: '2016-08-20T04:38:10.082Z',
        markdown: false,
        text: 'Test text',
        title: 'Test title'
      }
    }
    const stubbedStore = new Vuex.Store(testOptions)
    const mixin = {
      mounted () {
        Vue.nextTick(mountedAssertions.bind(this))
      },
      updated () {
        Vue.nextTick()
          .then(updatedAssertions.bind(this))
          .catch(done)
      }
    }
    const Component = Vue.extend({ ...Note, store: stubbedStore, mixins: [mixin] })
    new Component({ propsData }).$mount()
  })
})
