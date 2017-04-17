import Vue from 'vue'
import Vuex from 'vuex'
import '@/directives'
import cloneDeep from 'lodash/cloneDeep'
import { options } from '@/store'
import NoteForm from '@/components/NoteForm'
import 'semantic-ui-css/semantic.js'
import 'semantic-ui-css/semantic.css'

describe('NoteForm', () => {
  let testOptions

  beforeEach(() => {
    testOptions = cloneDeep(options)
  })

  it('has the correct name', () => {
    expect(NoteForm.name).to.equal('noteform')
  })

  it('has dependable mutations', (done) => {
    const TEST_TITLE = 'Test Title'
    const TEST_TEXT = 'Test Text'
    const TEST_COLOR = 'red'
    function assertions () {
      expect(this.title).to.equal(TEST_TITLE)
      expect(this.text).to.equal(TEST_TEXT)
      expect(this.newNoteColor).to.deep.equal({ 'background-color': this.colors[TEST_COLOR] })
      done()
    }
    const stubbedStore = new Vuex.Store(testOptions)
    const mounted = function mounted () {
      this.title = TEST_TITLE
      this.text = TEST_TEXT
      this.NOTE_FORM_COLOR(TEST_COLOR)
    }
    const updated = function updated () {
      Vue.nextTick()
        .then(assertions.bind(this))
        .catch(done)
    }
    const Component = Vue.extend({ ...NoteForm, store: stubbedStore, updated, mounted })
    new Component().$mount()
  })

  it('calls action on form submit', (done) => {
    sinon.stub(testOptions.actions, 'createNote').callsFake(({ commit }) => {
      done()
    })
    const stubbedStore = new Vuex.Store(testOptions)
    const mounted = function mounted () {
      $(this.$el.querySelector('button[type=submit]')).click()
    }
    const Component = Vue.extend({ ...NoteForm, store: stubbedStore, mounted })
    new Component().$mount()
  })
})
