import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import uuid from 'uuid/v4'
import moment from 'moment'

import { calculateAHListingCost, calculateAHTransactionCost } from '../../utils'

// Components

import { Table } from 'reactstrap'
import ItemRow from './ItemRow'

// Assets

import './ForSaleList.css'

class ForSaleList extends PureComponent {
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

  handleSoldItem = (item, { price, saleType }) => {
    const lastHistory = _.last(item.history)
    let updatedItem = { ...item }

    if (lastHistory && lastHistory.type === 'listing') {
      updatedItem = {
        ...updatedItem,
        history: [
          ..._.dropRight(item.history),
          {
            ...lastHistory,
            // If we sold via the AH, negate the previous listing fee.
            cost: saleType === 'ah' ? 0 : lastHistory.cost,
            // Save the listing end date.
            endedAt: lastHistory.endedAt || moment().format()
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
          saleType,
          price,
          // Only add transaction fees if the item was sold on the AH.
          cost: saleType === 'ah' ? calculateAHTransactionCost(price) : 0,
          createdAt: moment().format(),
          endedAt: moment().format()
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

  handleDeleteItem = (item) => {
    this.props.onDeleteItem(item)
  }

  // Rendering

  render () {
    return (
      <Table hover className='c-ForSaleList'>
        <thead>
          <tr>
            <th className='w-25'>Name</th>
            <th className='w-10'>Cost</th>
            <th className='w-10'>Price</th>
            <th className='w-10'>Profit</th>
            <th className='w-15'>Created</th>
            <th className='w-15'>Updated</th>
            {/* Actions column */}
            <th className='w-15'></th>
          </tr>
        </thead>
        <tbody>
          {this.props.items.map((item) => {
            return (
              <ItemRow
                key={item.key}
                item={item}
                onList={(payload) => this.handleListItem(item, payload)}
                onSold={(payload) => this.handleSoldItem(item, payload)}
                onEnd={() => this.handleEndItem(item)}
                onDelete={() => this.handleDeleteItem(item)}
              />
            )
          })}
        </tbody>
      </Table>
    )
  }
}

ForSaleList.defaultProps = {
  onChangeItem: () => {},
  onDeleteItem: () => {}
}

ForSaleList.propTypes = {
  items: PropTypes.array,
  onChangeItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
}

export default ForSaleList
