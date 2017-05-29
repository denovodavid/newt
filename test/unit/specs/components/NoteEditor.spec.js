import Vue from 'vue'
import Vuex from 'vuex'
import '../../../../src/directives'
import '../../../../src/filters'
import cloneDeep from 'lodash/cloneDeep'
import { options } from '../../../../src/store'
import NoteEditor from '../../../../src/components/NoteEditor'

describe('NoteEditor', () => {
  let testOptions

  beforeEach(() => {
    testOptions = cloneDeep(options)
  })

  it('has the correct name', () => {
    expect(NoteEditor.name).toBe('noteeditor')
  })

  it('has dependable mutations', (done) => {
    const TEST_TITLE = 'Test Title'
    const TEST_TEXT = 'Test Text'
    const TEST_COLOR = 'red'
    function assertions () {
      expect(this.title).toBe(TEST_TITLE)
      expect(this.text).toBe(TEST_TEXT)
      expect(this.noteColor).toBe(this.colors[TEST_COLOR])
      done()
    }
    const stubbedStore = new Vuex.Store(testOptions)
    const mixin = {
      mounted () {
        this.NOTE_EDITOR({
          show: true,
          note: {
            '.key': 'testkey',
            checked: false,
            color: TEST_COLOR,
            created_at: '2016-08-20T04:38:10.082Z',
            markdown: false,
            text: '',
            title: ''
          }
        })
        this.title = TEST_TITLE
        this.text = TEST_TEXT
      },
      updated () {
        Vue.nextTick()
          .then(assertions.bind(this))
          .catch(done)
      }
    }
    const Component = Vue.extend({ ...NoteEditor, store: stubbedStore, mixins: [mixin] })
    new Component().$mount()
  })

  it('calls action on hidden', (done) => {
    sinon.stub(testOptions.actions, 'updateNote').callsFake(({ commit }) => {
      done()
    })
    const stubbedStore = new Vuex.Store(testOptions)
    const mixin = {
      mounted () {
        this.NOTE_EDITOR({
          show: true,
          note: {
            '.key': 'testkey',
            checked: false,
            color: '',
            created_at: '2016-08-20T04:38:10.082Z',
            markdown: false,
            text: '',
            title: ''
          }
        })
      },
      updated () {
        $(this.$el).modal('hide')
      }
    }
    const Component = Vue.extend({ ...NoteEditor, store: stubbedStore, mixins: [mixin] })
    new Component().$mount()
  })
})
