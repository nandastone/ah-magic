import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'

import { calculateAHListingCost } from '../../utils/'

// Components

import ItemRow from './ItemRow'

class ItemList extends PureComponent {
  // Event handling

  handleListItem = (item, { price, isVendored }) => {
    const newItem = {
      ...item,
      history: [
        ...item.history,
        {
          key: uuid(),
          type: 'listing',
          price,
          isVendored,
          cost: calculateAHListingCost(item.vendorValue)
        }
      ]
    }
    this.props.onChangeItem(newItem)
  }

  handleSoldItem = (item) => {
    console.log('sold', item)
  }

  // Rendering

  render () {

    return (
      <div>
        {this.props.items.map((item) => {
          return (
            <ItemRow
              key={item.key}
              name={item.name}
              history={item.history}
              onList={(payload) => this.handleListItem(item, payload)}
              onSold={() => this.handleSoldItem(item)}
            />
          )
        })}
      </div>
    )
  }
}

ItemList.defaultProps = {
  onChangeItem: () => {}
}

ItemList.propTypes = {
  items: PropTypes.array,
  onChangeItem: PropTypes.func
}

export default ItemList
