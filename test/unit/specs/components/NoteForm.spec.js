import Vue from 'vue'
import Vuex from 'vuex'
import '../../../../src/directives'
import '../../../../src/filters'
import cloneDeep from 'lodash/cloneDeep'
import { options } from '../../../../src/store'
import NoteForm from '../../../../src/components/NoteForm'

describe('NoteForm', () => {
  let testOptions

  beforeEach(() => {
    testOptions = cloneDeep(options)
  })

  it('has the correct name', () => {
    expect(NoteForm.name).toBe('noteform')
  })

  it('has dependable mutations', (done) => {
    const TEST_TITLE = 'Test Title'
    const TEST_TEXT = 'Test Text'
    const TEST_COLOR = 'red'
    function assertions () {
      expect(this.title).toBe(TEST_TITLE)
      expect(this.text).toBe(TEST_TEXT)
      expect(this.newNoteColor).toEqual({ 'background-color': this.colors[TEST_COLOR] })
      done()
    }
    const stubbedStore = new Vuex.Store(testOptions)
    const mixin = {
      mounted () {
        this.title = TEST_TITLE
        this.text = TEST_TEXT
        this.NOTE_FORM_COLOR(TEST_COLOR)
      },
      updated () {
        Vue.nextTick()
          .then(assertions.bind(this))
          .catch(done)
      }
    }
    const Component = Vue.extend({ ...NoteForm, store: stubbedStore, mixins: [mixin] })
    new Component().$mount()
  })

  it('calls action on form submit', (done) => {
    sinon.stub(testOptions.actions, 'createNote').callsFake(({ commit }) => {
      done()
    })
    const stubbedStore = new Vuex.Store(testOptions)
    const mixin = {
      mounted () {
        $(this.$el.querySelector('button[type=submit]')).click()
      }
    }
    const Component = Vue.extend({ ...NoteForm, store: stubbedStore, mixins: [mixin] })
    new Component().$mount()
  })
})
