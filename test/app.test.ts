import { test, expect } from 'vitest'
import App from '../src/App.vue'
import { mount } from '@vue/test-utils'
// import { nextTick } from 'vue'

test('App load', async () => {
    expect(App).toBeTruthy()
    const wrapper = mount(App)
    const input = wrapper.find('input')
    expect(input.element.value).toBe('')
})
