import { mount, VueWrapper } from '@vue/test-utils'
import SmartScroll from '../lib'

test('Renders scroll component', () => {
  const wrapper: VueWrapper = mount(SmartScroll as never)

  wrapper.exists()
})

