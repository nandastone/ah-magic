import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

// Components

import ForSaleList from './'

const items = [
  { key: 1, name: 'Item 1', history: [], vendorValue: 5000 },
  { key: 2, name: 'Item 2', history: [], vendorValue: 10000 },
  { key: 3, name: 'Item 3', history: [], vendorValue: 10000 },
]

describe('ForSaleList component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ForSaleList items={items} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render the correct number of item rows', () => {
    const wrapper = shallow(<ForSaleList items={items} />)
    expect(wrapper.find('ItemRow').length).toEqual(3)
  })
})
