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

  handleListItem = (item, { price }) => {
    const updatedItem = {
      ...item,
      history: [
        ...item.history,
        {
          key: uuid(),
          type: 'listing',
          price,
          cost: calculateAHListingCost(item.vendorValue)
        }
      ]
    }
    this.props.onChangeItem(updatedItem)
  }

  handleSoldItem = (item, { price, isVendored }) => {
    const lastHistory = _.last(item.history)
    let updatedItem = {}

    // If the last history item was a listing, and we didn't sell to a vendor, update that last history item to a sale.
    if (lastHistory && lastHistory.type === 'listing' && !isVendored) {
      updatedItem = {
        ...item,
        // Replace last history item with a "sale"
        history: [
          ..._.dropRight(item.history),
          {
            ...lastHistory,
            type: 'sale',
            // Replace the AH listing fee with the AH transaction fee.
            cost: calculateAHTransactionCost(price)
          }
        ]
      }
    } else {
      updatedItem = {
        ...item,
        // Add a new "sale" item
        history: [
          ...item.history,
          {
            key: uuid(),
            type: 'sale',
            price,
            // If item was vendored, it doesn't have any fees.
            cost: !isVendored ? calculateAHTransactionCost(price) : 0
          }
        ]
      }
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
              name={item.name}
              history={item.history}
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
