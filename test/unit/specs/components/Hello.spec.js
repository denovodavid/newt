import { mount } from 'avoriaz'
import Hello from '@/components/Hello'

describe('Hello', () => {
  it('should render correct contents', () => {
    const wrapper = mount(Hello)
    expect(wrapper.find('.hello h1')[0].text()).toBe('Welcome to Your Vue.js App')
  })
})
