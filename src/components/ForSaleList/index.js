import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import uuid from 'uuid/v4'
import moment from 'moment'

import {
  calculateAHListingCost,
  calculateAHTransactionCost,
  calculateItemFinances
} from '../../utils'

// Components

import { Table } from 'reactstrap'
import ItemRow from './ItemRow'

// Assets

import './ForSaleList.css'

class ForSaleList extends PureComponent {
  state = {
    sortField: '',
    sortDirection: 'DESC'
  }

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

    // If the item is listed, remove the "listing" history entry to later replace with a "sale" history entry.
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

    // Create a "sale" history entry.
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

  // Private

  _sort (field) {
    if (this.state.sortField === field && this.state.sortDirection === 'ASC') {
      // Reset sorting if we've reached the end of sort directions.
      this.setState({ sortField: '', sortDirection: 'DESC' })
    } else if (this.state.sortField === field) {
      this.setState({ sortField: field, sortDirection: 'ASC' })
    } else {
      this.setState({ sortField: field, sortDirection: 'DESC' })
    }
  }

  _getSortedItems (items) {
    const { sortField: field, sortDirection: direction } = this.state
    let sorted = [...items]

    switch (field) {
      case 'name':
        sorted = _.sortBy(items, ['name'])
        if (direction === 'DESC') sorted.reverse()
        break
      case 'cost':
        sorted = _.sortBy(items, (item) => {
          const { cost } = calculateItemFinances(item.history)
          return cost || 0
        })
        if (direction === 'DESC') sorted.reverse()
        break
      case 'price':
        sorted = _.sortBy(items, (item) => {
          const { price } = calculateItemFinances(item.history)
          return price || 0
        })
        if (direction === 'DESC') sorted.reverse()
        break
      case 'profit':
        sorted = _.sortBy(items, (item) => {
          const { profit } = calculateItemFinances(item.history)
          return profit || 0
        })
        if (direction === 'DESC') sorted.reverse()
        break
      case 'createdAt':
        sorted = _.sortBy(items, (item) => {
          const firstHistory = _.first(item.history)
          return firstHistory.createdAt ? moment(firstHistory.createdAt).format('X') : 0
        })
        if (direction === 'DESC') sorted.reverse()
        break
      case 'updatedAt':
        sorted = _.sortBy(items, (item) => {
          const lastHistory = _.last(item.history)
          const updatedAt = (lastHistory.endedAt || lastHistory.createdAt)
          return updatedAt ? moment(updatedAt).format('X') : 0
        })
        if (direction === 'DESC') sorted.reverse()
        break
      default:
        throw new Error(`Invalid sorting column passed to ForSaleList: ${field}`)
    }

    return sorted
  }

  // Rendering

  render () {
    const sortedItems = this.state.sortField ? this._getSortedItems(this.props.items) : this.props.items

    return (
      <Table hover className='c-ForSaleList'>
        <thead>
          <tr>
            <th
              onClick={() => this._sort('name')}
              className='w-25'
            >
              Name
              {
                this.state.sortField === 'name'
                ? ` Sorted (${this.state.sortDirection})`
                : null
              }
            </th>
            <th
              onClick={() => this._sort('cost')}
              className='w-10'
            >
              Cost
              {
                this.state.sortField === 'cost'
                ? ` Sorted (${this.state.sortDirection})`
                : null
              }
            </th>
            <th
              onClick={() => this._sort('price')}
              className='w-10'
            >
              Price
              {
                this.state.sortField === 'price'
                ? ` Sorted (${this.state.sortDirection})`
                : null
              }
            </th>
            <th
              onClick={() => this._sort('profit')}
              className='w-10'
            >
              Profit
              {
                this.state.sortField === 'profit'
                ? ` Sorted (${this.state.sortDirection})`
                : null
              }
            </th>
            <th
              onClick={() => this._sort('createdAt')}
              className='w-15'
            >
              Created
              {
                this.state.sortField === 'createdAt'
                ? ` Sorted (${this.state.sortDirection})`
                : null
              }
            </th>
            <th
              onClick={() => this._sort('updatedAt')}
              className='w-15'
            >
              Updated
              {
                this.state.sortField === 'updatedAt'
                ? ` Sorted (${this.state.sortDirection})`
                : null
              }
            </th>
            {/* Actions column */}
            <th className='w-15'></th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => {
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
