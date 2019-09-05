import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

// Components

import SaleList from './'

const items = [
  { key: 1, name: 'Item 1', history: [], vendorValue: 5000 },
  { key: 2, name: 'Item 2', history: [], vendorValue: 10000 },
  { key: 3, name: 'Item 3', history: [], vendorValue: 10000 },
]

describe('SaleList component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SaleList items={items} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render the correct number of item rows', () => {
    const wrapper = shallow(<SaleList items={items} />)
    expect(wrapper.find('ItemRow').length).toEqual(3)
  })
})
