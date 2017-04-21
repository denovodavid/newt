import Vue from 'vue'
import Vuex from 'vuex'
import '@/directives'
import '@/filters'
import cloneDeep from 'lodash/cloneDeep'
import { options } from '@/store'
import Testing from '@/components/Testing'

// THIS HELPED A LOT
// https://github.com/johnnynotsolucky/samples/blob/master/vuejs-sample-1/test/unit/specs/List.spec.js

describe('Testing', () => {
  let testOptions

  beforeEach(() => {
    testOptions = cloneDeep(options)
  })

  it('has the correct name', () => {
    expect(Testing.name).to.equal('testing')
  })

  // We mock out the functionality which connects to and
  // listens for events from the fake event stream. This gives us full control
  // over emitted data, and mitigates uncontrollable dependencies.
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
    const Component = Vue.extend({ ...Testing, store: stubbedStore, mixins: [mixin] })
    new Component().$mount() // eslint-disable-line no-new
  })

  it('calls action on form submit', (done) => {
    // We stub our createNote action to make sure we're listening to the
    // correct EventEmitter
    sinon.stub(testOptions.actions, 'createNote').callsFake(({ commit }) => {
      done()
    })

    const stubbedStore = new Vuex.Store(testOptions)
    const mixin = {
      mounted () {
        $(this.$el.querySelector('button[type=submit]')).click()
      }
    }
    const Component = Vue.extend({ ...Testing, store: stubbedStore, mixins: [mixin] })
    new Component().$mount() // eslint-disable-line no-new
  })
})
