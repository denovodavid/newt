import Vue from 'vue'
import NoteForm from '@/components/NoteForm'
import Colors from '@/colors'

describe('NoteForm.vue', () => {
  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    expect(typeof NoteForm.data).to.equal('function')
    const defaultData = NoteForm.data()
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
  //   const vm = new Vue(NoteForm).$mount()
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
    const Ctor = Vue.extend(NoteForm)
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
    const Ctor = Vue.extend(NoteForm)
    const vm = new Ctor().$mount()
    const text = 'Correct Text'
    vm.newNote.text = text
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('#note-text').value).to.equal(text)
      done()
    })
  })

  // Mount an instance and inspect the render output
  it('renders the correct markdown', done => {
    const Ctor = Vue.extend(NoteForm)
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
    const Ctor = Vue.extend(NoteForm)
    const vm = new Ctor().$mount()
    vm.newNote.color = 'red'
    var expected = (vm.newNote.color === 'none') ? '' : hexToRGB(Colors[vm.newNote.color])
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('.extra.content').style.backgroundColor).to.equal(expected)
      done()
    })
  })
})

function hasClass (element, cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1
}

// convert a hexidecimal color string to 0..255 R,G,B
// https://gist.github.com/lrvick/2080648
function hexToRGB (hex) {
  if (hex.length < 7) {
    var r = hex.slice(1, 2)
    var g = hex.slice(2, 3)
    var b = hex.slice(3, 4)
    hex = '0x' + r + r + g + g + b + b
  } else {
    hex = hex.replace('#', '0x')
  }
  var rr = hex >> 16
  var gg = hex >> 8 & 0xFF
  var bb = hex & 0xFF
  return 'rgb(' + rr + ', ' + gg + ', ' + bb + ')'
}
