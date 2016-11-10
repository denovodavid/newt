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
  // it('correctly sets the message when created', () => {
  //   const vm = new Vue(Noteform).$mount()
  //   expect(vm.newNote).to.deep.equal({
  //     title: '',
  //     text: '',
  //     markdown: false,
  //     color: 'none',
  //     created_at: ''
  //   })
  // })

  // Mount an instance and inspect the render output
  it('renders the correct title', done => {
    const Ctor = Vue.extend(Noteform)
    const vm = new Ctor().$mount()
    const title = 'Correct Title'
    vm.newNote.title = title
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('#note-title').value).to.equal(title)
      done()
    })
  })

  // Mount an instance and inspect the render output
  it('renders the correct text', done => {
    const Ctor = Vue.extend(Noteform)
    const vm = new Ctor().$mount()
    const text = 'Correct Text'
    vm.newNote.text = text
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('#note-text').value).to.equal(text)
      done()
    })
  })

  function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1
  }

  // Mount an instance and inspect the render output
  it('renders the correct markdown', done => {
    const Ctor = Vue.extend(Noteform)
    const vm = new Ctor().$mount()
    const markdown = true
    vm.newNote.markdown = markdown
    Vue.nextTick(() => {
      expect(hasClass(vm.$el.querySelector('#note-markdown'), 'active')).to.equal(markdown)
      // expect((' ' + vm.$el.querySelector('#note-markdown').className + ' ').indexOf('active') > -1).to.equal(markdown)
      done()
    })
  })

  // Mount an instance and inspect the render output
  it('renders the correct color', done => {
    const Ctor = Vue.extend(Noteform)
    const vm = new Ctor().$mount()
    vm.newNote.color = 'red'
    Vue.nextTick(() => {
      expect(window.getComputedStyle(vm.$el.querySelector('.extra.content')).getPropertyValue('background-color')).to.equal('#ff8a80')
      done()
    })
  })

})
