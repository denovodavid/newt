import Vue from 'vue'
// import Vuex from 'vuex'
import NoteForm from '@/components/NoteForm'
import store from '@/store'
import AutoSize from 'autosize'
// import Colors from '@/colors'

describe('NoteForm.vue', () => {
  // Evaluate the results of functions in
  // the raw component options
  // it('has a created hook', () => {
  //   expect(typeof NoteForm.created).toBe('function')
  // })

  it('dependable updates to state', (done) => {
    // Group our assertions for readability
    function assertions () {
      expect(this.title).toBe('')
      // assert.equal(this.items.length, 1); // We know one item should exist
      // assert.equal(this.items[0], 'foobar'); // That item should be 'foobar'
      // // The <li /> element should correlate the previous tests
      // assert.equal(this.$el.querySelectorAll('ul > li').length, 1);
      // assert.match( // Generated <li /> text is wrapped with whitespace, test for it
      //   this.$el.querySelector('ul > li').textContent,
      //   /^\s*foobar\s*$/);
      done()
    }
    // const stubbedStore = new Vuex.Store({
    //   state: {
    //     newNote: {
    //       title: '',
    //       text: '',
    //       markdown: false,
    //       color: 'none'
    //     }
    //   }
    // })

    Vue.filter('capitalise', (text) => {
      return text[0].toUpperCase() + text.slice(1)
    })

    // Register a global custom directive called v-dropdown
    Vue.directive('dropdown', {
      bind (el) {
        $(el).dropdown()
      },
      unbind (el) {
        $(el).dropdown('destroy')
      }
    })

    // Register a global custom directive called v-autosize
    Vue.directive('autosize', {
      bind (el) {
        AutoSize($(el))
      },
      unbind (el) {
        AutoSize.destroy($(el))
      }
    })

    // Register a global custom directive called v-modal
    Vue.directive('modal', {
      bind (el) {
        $(el).modal()
      },
      unbind (el) {
        $(el).modal('destroy')
      }
    })

    const updated = function updated () {
      Vue.nextTick()
        .then(assertions.bind(this))
        .catch(done)
    }
    const Component = Vue.extend({ ...NoteForm, store, updated })
    new Component().$mount() // eslint-disable-line no-new
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

  // // Mount an instance and inspect the render output
  // it('renders the correct title', done => {
  //   const Ctor = Vue.extend(NoteForm)
  //   const vm = new Ctor().$mount()
  //   const title = 'Correct Title'
  //   vm.newNote.title = title
  //   Vue.nextTick(() => {
  //     expect(vm.$el.querySelector('#note-title').value).to.equal(title)
  //     done()
  //   })
  // })

  // // Mount an instance and inspect the render output
  // it('renders the correct text', done => {
  //   const Ctor = Vue.extend(NoteForm)
  //   const vm = new Ctor().$mount()
  //   const text = 'Correct Text'
  //   vm.newNote.text = text
  //   Vue.nextTick(() => {
  //     expect(vm.$el.querySelector('#note-text').value).to.equal(text)
  //     done()
  //   })
  // })

  // // Mount an instance and inspect the render output
  // it('renders the correct markdown', done => {
  //   const Ctor = Vue.extend(NoteForm)
  //   const vm = new Ctor().$mount()
  //   const markdown = true
  //   vm.newNote.markdown = markdown
  //   Vue.nextTick(() => {
  //     expect(hasClass(vm.$el.querySelector('#note-markdown'), 'active')).to.equal(markdown)
  //     // expect((' ' + vm.$el.querySelector('#note-markdown').className + ' ').indexOf('active') > -1).to.equal(markdown)
  //     done()
  //   })
  // })

  // // Mount an instance and inspect the render output
  // it('renders the correct color', done => {
  //   const Ctor = Vue.extend(NoteForm)
  //   const vm = new Ctor().$mount()
  //   vm.newNote.color = 'red'
  //   var expected = (vm.newNote.color === 'none') ? '' : hexToRGB(Colors[vm.newNote.color])
  //   Vue.nextTick(() => {
  //     expect(vm.$el.querySelector('.extra.content').style.backgroundColor).to.equal(expected)
  //     done()
  //   })
  // })
})

// function hasClass (element, cls) {
//   return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1
// }

// // convert a hexidecimal color string to 0..255 R,G,B
// // https://gist.github.com/lrvick/2080648
// function hexToRGB (hex) {
//   if (hex.length < 7) {
//     var r = hex.slice(1, 2)
//     var g = hex.slice(2, 3)
//     var b = hex.slice(3, 4)
//     hex = '0x' + r + r + g + g + b + b
//   } else {
//     hex = hex.replace('#', '0x')
//   }
//   var rr = hex >> 16
//   var gg = hex >> 8 & 0xFF
//   var bb = hex & 0xFF
//   return 'rgb(' + rr + ', ' + gg + ', ' + bb + ')'
// }
