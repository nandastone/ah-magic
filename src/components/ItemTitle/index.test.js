import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

// Components

import ItemTitle from './'

describe('ItemTitle component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ItemTitle name='My Bazooka' count={50} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should display the item title', () => {
    const wrapper = shallow(<ItemTitle name='My Bazooka' />)
    expect(wrapper.find('[data-test="name"]').text()).toBe('My Bazooka')
  })

  it('should not display the item count if there\'s only one', () => {
    const wrapper = shallow(<ItemTitle name='My Bazooka' count={1} />)
    expect(wrapper.contains('[data-test="count"]')).toBe(false)
  })

  it('should display the item count when there\'s more than one', () => {
    const wrapper = shallow(<ItemTitle name='My Bazooka' count={10} />)
    expect(wrapper.find('[data-test="count"]').text()).toBe('x10')
  })
})
