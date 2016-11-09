import Vue from 'vue'
import Noteform from 'src/components/Noteform'

describe('Noteform.vue', () => {
  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    expect(typeof Noteform.data).to.equal('function')
    const defaultData = Noteform.data()
    expect(defaultData.newNote).to.deep.equal({
      title: '',
      text: '',
      markdown: false,
      color: 'none',
      created_at: ''
    })
  })

  // Inspect the component instance on mount
  it('correctly sets the message when created', () => {
    const vm = new Vue(Noteform).$mount()
    // expect(vm.newNote.title).to.equal('')
    expect(vm.newNote).to.deep.equal({
      title: '',
      text: '',
      markdown: false,
      color: 'none',
      created_at: ''
    })
  })

  // Mount an instance and inspect the render output
  it('renders the correct message', done => {
    const Ctor = Vue.extend(Noteform)
    const vm = new Ctor().$mount()
    expect(vm.$el.querySelector('#note-title').value).to.equal('')

    vm.newNote.title = '911'
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('#note-title').value).to.equal('911')
      done()
    })

  })
})
