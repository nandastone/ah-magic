import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

// Components

import ItemRow from './'

const item = {
  key: 'key-1',
  name: 'Pretty Flower',
  history: [],
  stackable: 20,
  vendorValue: 5000,
}

const unlistedItem = {
  ...item,
  history: [
    {
      key: 'key-1',
      type: 'purchase',
      cost: 19550,
      createdOn: '2018-03-10T07:10:39+10:00',
    },
    {
      key: 'key-2',
      type: 'listing',
      bid: 100000,
      price: 129500,
      cost: 5000,
      createdOn: '2018-03-11T07:11:39+10:00',
      endedOn: '2018-03-12T07:12:39+10:00',
    },
    {
      key: 'key-3',
      type: 'listing',
      bid: 100000,
      price: 119500,
      cost: 0,
      createdOn: '2018-03-13T07:11:39+10:00',
      endedOn: '2018-03-14T07:12:39+10:00',
    },
  ],
}

const listedItem = {
  ...item,
  history: [
    {
      key: 'key-1',
      type: 'purchase',
      cost: 19550,
      createdOn: '2018-03-10T07:10:39+10:00',
    },
    {
      key: 'key-2',
      type: 'listing',
      bid: 100000,
      price: 129500,
      cost: 5000,
      createdOn: '2018-03-11T07:11:39+10:00',
      endedOn: '2018-03-12T07:12:39+10:00',
    },
    {
      key: 'key-3',
      type: 'listing',
      bid: 100000,
      price: 119500,
      cost: 0,
      createdOn: '2018-03-13T07:11:39+10:00',
    },
  ],
}

describe('ItemRow component', () => {
  beforeEach(() => jest.resetAllMocks())

  it('renders correctly', () => {
    const tree = renderer.create(<ItemRow item={unlistedItem} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('it should display the date the item was created', () => {
    const wrapper = shallow(<ItemRow item={unlistedItem} />)
    expect(wrapper.find('[data-test="created-at"]').text()).toBe('10 Mar 2018')
  })

  it('it should display the date the item was last updated', () => {
    const wrapper = shallow(<ItemRow item={unlistedItem} />)
    expect(wrapper.find('[data-test="updated-at"]').text()).toBe('14 Mar 2018')
  })

  it('it should display a "listing" button if the item is unlisted', () => {
    const wrapper = shallow(<ItemRow item={unlistedItem} />)
    expect(wrapper.exists('[data-test="list-button"]')).toBe(true)
  })

  it('it should display an "end" button if the item is listed', () => {
    const wrapper = shallow(<ItemRow item={listedItem} />)
    expect(wrapper.exists('[data-test="end-button"]')).toBe(true)
  })

  it('it should open the item details modal when the row is clicked', () => {
    const wrapper = shallow(<ItemRow item={unlistedItem} />)
    wrapper.simulate('click', { preventDefault: () => {} })
    const itemDetailModal = wrapper.find('ItemDetailModal')
    expect(itemDetailModal.props().open).toBe(true)
  })

  it('it should open the list item form modal when the "list" button is clicked', () => {
    const wrapper = shallow(<ItemRow item={unlistedItem} />)
    wrapper
      .find('[data-test="list-button"]')
      .simulate('click', { stopPropagation: () => {} })
    const ListItemModal = wrapper.find('ListItemModal')
    expect(ListItemModal.props().open).toBe(true)
  })

  it('it should open the sold item form modal when the "sold" button is clicked', () => {
    const wrapper = shallow(<ItemRow item={listedItem} />)
    wrapper
      .find('[data-test="sold-button"]')
      .simulate('click', { stopPropagation: () => {} })
    const SellItemModal = wrapper.find('SellItemModal')
    expect(SellItemModal.props().open).toBe(true)
  })

  it('it should call the onList prop when completing the list item form', () => {
    const payload = { key: 'id-1', type: 'listing' }
    const onList = jest.fn()
    const wrapper = shallow(<ItemRow item={listedItem} onList={onList} />)
    wrapper.find('ListItemModal').prop('onComplete')(payload)
    expect(onList).toHaveBeenCalledWith(payload)
  })

  it('it should call the onEnd prop when the "end" button is clicked', () => {
    const onEnd = jest.fn()
    const wrapper = shallow(<ItemRow item={listedItem} onEnd={onEnd} />)
    wrapper
      .find('[data-test="end-button"]')
      .simulate('click', { stopPropagation: () => {} })
    expect(onEnd).toHaveBeenCalled()
  })

  it('it should call the onSold prop when completing the sold item form', () => {
    const payload = { key: 'id-1', type: 'listing' }
    const onSold = jest.fn()
    const wrapper = shallow(<ItemRow item={listedItem} onSold={onSold} />)
    wrapper.find('SellItemModal').prop('onComplete')(payload)
    expect(onSold).toHaveBeenCalledWith(payload)
  })

  it('it should call the onDelete prop when accepting the delete confirmation', () => {
    window.confirm = jest.fn(() => true)
    const onDelete = jest.fn()
    const wrapper = shallow(<ItemRow item={listedItem} onDelete={onDelete} />)
    wrapper
      .find('[data-test="delete-button"]')
      .simulate('click', { stopPropagation: () => {} })
    expect(onDelete).toHaveBeenCalled()
  })
})
