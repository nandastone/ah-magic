import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import uuid from 'uuid/v4'
import moment from 'moment'

import { calculateAHListingCost, calculateAHTransactionCost } from '../../utils'

// Components

import ItemRow from './ItemRow'

class SaleItemList extends PureComponent {
  // Event handling

  handleListItem = (item, { bid, price, duration }) => {
    const updatedItem = {
      ...item,
      history: [
        ...item.history,
        {
          key: uuid(),
          type: 'listing',
          duration,
          bid,
          price,
          cost: calculateAHTransactionCost(price),
          createdAt: moment().format()
        }
      ]
    }
    this.props.onChangeItem(updatedItem)
  }

  handleSoldItem = (item, { price, isVendored }) => {
    const lastHistory = _.last(item.history)
    let updatedItem = {}

    // If the last history item was a listing, and we didn't sell to a vendor, update that last history item cost to
    // zero (no listing fee).
    if (lastHistory && lastHistory.type === 'listing' && !isVendored) {
      updatedItem = {
        ...item,
        history: [
          ..._.dropRight(item.history),
          {
            ...lastHistory,
            cost: 0,
            endedAt: moment().format()
          }
        ]
      }
    }

    // Add a new "sale" item
    updatedItem = {
      ...updatedItem,
      history: [
        ...updatedItem.history,
        {
          key: uuid(),
          type: 'sale',
          price,
          // If item was vendored, it doesn't have any fees.
          cost: !isVendored ? calculateAHTransactionCost(price) : 0,
          createdAt: moment().format()
        }
      ]
    }

    this.props.onChangeItem(updatedItem)
  }

  handleEndItem = (item) => {
    const lastHistory = _.last(item.history)
    const updatedItem = {
      ...item,
      // Update last history item (listing) with an ended date
      history: [
        ..._.dropRight(item.history),
        {
          ...lastHistory,
          cost: calculateAHListingCost(item.vendorValue, lastHistory.duration),
          endedAt: moment().format()
        }
      ]
    }
    this.props.onChangeItem(updatedItem)
  }

  // Rendering

  render () {

    return (
      <div>
        {this.props.items.map((item) => {
          return (
            <ItemRow
              key={item.key}
              item={item}
              onList={(payload) => this.handleListItem(item, payload)}
              onSold={(payload) => this.handleSoldItem(item, payload)}
              onEnd={() => this.handleEndItem(item)}
            />
          )
        })}
      </div>
    )
  }
}

SaleItemList.defaultProps = {
  onChangeItem: () => {}
}

SaleItemList.propTypes = {
  items: PropTypes.array,
  onChangeItem: PropTypes.func
}

export default SaleItemList
