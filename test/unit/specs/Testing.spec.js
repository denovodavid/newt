import Vue from 'vue'
import '@/directives'
import Testing from '@/components/Testing'
import 'semantic-ui-css/semantic.js'
import 'semantic-ui-css/semantic.css'

describe('Testing', () => {
  it('has the correct name', () => {
    console.log(Testing)
    expect(Testing.name).to.equal('testing')
  })

  it('has the correct something', () => {
    const Constructor = Vue.extend(Testing)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#done-button').textContent)
      .to.equal('Done')
  })
})
