import Vue from 'vue'
import '@/directives'
import store from '@/store'
import Testing from '@/components/Testing'
import 'semantic-ui-css/semantic.js'
import 'semantic-ui-css/semantic.css'

// IMPORTANT THING MAYBE
// https://github.com/johnnynotsolucky/samples/blob/master/vuejs-sample-1/test/unit/specs/List.spec.js

describe('Testing', () => {
  it('has the correct name', () => {
    expect(Testing.name).to.equal('testing')
  })

  it('has the correct something', () => {
    const Constructor = Vue.extend({ ...Testing, store })
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#done-button').textContent)
      .to.equal('Done')
  })
})
