import React, { PureComponent } from 'react'
import _ from 'lodash'
import uuid from 'uuid/v4'
import moment from 'moment'
import classNames from 'classnames'
import { animateScroll as scroll } from 'react-scroll'

import {
  calculateAHListingCost,
  calculateAHTransactionCost,
  calculateListingFinances,
} from '../../utils'

// Context

import { InventoryContext } from '../../contexts/InventoryContext'

// Components

import { Table } from 'reactstrap'
import ItemRow from './ItemRow'
import TotalRow from '../TotalRow'

// Assets

import './SaleList.css'

class SaleList extends PureComponent {
  static contextType = InventoryContext

  state = {
    sortField: '',
    sortDirection: 'DESC',
    restoreScroll: 0,
  }

  // Lifecycle

  componentWillReceiveProps(nextProps) {
    // this.setState({ restoreScroll: window.scrollY })
  }

  componentDidUpdate() {
    // if (this.state.restoreScroll) {
    //   scroll.scrollTo(this.state.restoreScroll, { duration: 0 })
    // }
  }

  // Event handling

  handleListItem = (item, { bid, price, duration }) => {
    // const updatedItem = {
    //   ...item,
    //   history: [
    //     ...item.history,
    //     {
    //       key: uuid(),
    //       type: 'listing',
    //       duration,
    //       bid,
    //       price,
    //       cost: calculateAHTransactionCost(price),
    //       createdOn: moment().format(),
    //     },
    //   ],
    // }
    // this.props.onChangeItem(updatedItem)
  }

  handleSellItem = (item, { price, saleType }) => {
    this.context.sellItem(item, price, saleType)
  }

  handleEndItem = item => {
    // const lastHistory = _.last(item.history)
    // const updatedItem = {
    //   ...item,
    //   // Update last history item (listing) with an ended date
    //   history: [
    //     ..._.dropRight(item.history),
    //     {
    //       ...lastHistory,
    //       cost: calculateAHListingCost(item.vendorValue, lastHistory.duration),
    //       endedOn: moment().format(),
    //     },
    //   ],
    // }
    // this.props.onChangeItem(updatedItem)
  }

  handleDeleteItem = item => {
    // this.props.onDeleteItem(item)
  }

  // Private

  _sort(field) {
    if (this.state.sortField === field && this.state.sortDirection === 'ASC') {
      // Reset sorting if we've reached the end of sort directions.
      this.setState({ sortField: '', sortDirection: 'DESC' })
    } else if (this.state.sortField === field) {
      this.setState({ sortField: field, sortDirection: 'ASC' })
    } else {
      this.setState({ sortField: field, sortDirection: 'DESC' })
    }
  }

  _sortItems(items) {
    const { sortField: field, sortDirection: direction } = this.state
    let sorted = [...items]

    switch (field) {
      case 'name':
        sorted = _.sortBy(items, ['name'])
        break
      case 'cost':
        sorted = _.sortBy(items, item => {
          const { cost } = calculateListingFinances(item.history)
          return cost || 0
        })
        break
      case 'price':
        sorted = _.sortBy(items, item => {
          const { price } = calculateListingFinances(item.history)
          return price || 0
        })
        break
      case 'profit':
        sorted = _.sortBy(items, item => {
          const { profit } = calculateListingFinances(item.history)
          return profit || 0
        })
        break
      case 'createdOn':
        sorted = _.sortBy(items, item => {
          const firstHistory = _.first(item.history)
          return firstHistory.createdOn
            ? moment(firstHistory.createdOn).format('X')
            : 0
        })
        break
      // This is the default sort.
      case 'updatedOn':
      default:
        sorted = _.sortBy(items, item => {
          const lastHistory = _.last(item.history)
          const updatedOn = lastHistory.endedOn || lastHistory.createdOn
          return updatedOn ? moment(updatedOn).format('X') : 0
        })
        break
    }

    if (direction === 'DESC') {
      sorted.reverse()
    }

    return sorted
  }

  // Rendering

  render() {
    const items = this._sortItems(this.context.sale)

    return (
      <Table hover className="c-SaleList">
        <thead>
          <tr>
            <th onClick={() => this._sort('name')} className="w-25">
              Name
              {this.state.sortField === 'name' ? (
                <i
                  className={classNames('fas sort-icon', {
                    'fa-sort-up': this.state.sortDirection === 'ASC',
                    'fa-sort-down': this.state.sortDirection === 'DESC',
                  })}
                />
              ) : null}
            </th>
            <th onClick={() => this._sort('cost')} className="w-10">
              Cost
              {this.state.sortField === 'cost' ? (
                <i
                  className={classNames('fas sort-icon', {
                    'fa-sort-up': this.state.sortDirection === 'ASC',
                    'fa-sort-down': this.state.sortDirection === 'DESC',
                  })}
                />
              ) : null}
            </th>
            <th onClick={() => this._sort('price')} className="w-10">
              Price
              {this.state.sortField === 'price' ? (
                <i
                  className={classNames('fas sort-icon', {
                    'fa-sort-up': this.state.sortDirection === 'ASC',
                    'fa-sort-down': this.state.sortDirection === 'DESC',
                  })}
                />
              ) : null}
            </th>
            <th onClick={() => this._sort('profit')} className="w-10">
              Profit
              {this.state.sortField === 'profit' ? (
                <i
                  className={classNames('fas sort-icon', {
                    'fa-sort-up': this.state.sortDirection === 'ASC',
                    'fa-sort-down': this.state.sortDirection === 'DESC',
                  })}
                />
              ) : null}
            </th>
            <th onClick={() => this._sort('createdOn')} className="w-15">
              Created
              {this.state.sortField === 'createdOn' ? (
                <i
                  className={classNames('fas sort-icon', {
                    'fa-sort-up': this.state.sortDirection === 'ASC',
                    'fa-sort-down': this.state.sortDirection === 'DESC',
                  })}
                />
              ) : null}
            </th>
            <th onClick={() => this._sort('updatedOn')} className="w-15">
              Updated
              {this.state.sortField === 'updatedOn' ? (
                <i
                  className={classNames('fas sort-icon', {
                    'fa-sort-up': this.state.sortDirection === 'ASC',
                    'fa-sort-down': this.state.sortDirection === 'DESC',
                  })}
                />
              ) : null}
            </th>
            {/* Actions column */}
            <th className="w-15"></th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            return (
              <ItemRow
                key={item.id}
                item={item}
                onList={payload => this.handleListItem(item, payload)}
                onSold={payload => this.handleSellItem(item, payload)}
                onEnd={() => this.handleEndItem(item)}
                onDelete={() => this.handleDeleteItem(item)}
              />
            )
          })}
          <TotalRow items={items} />
        </tbody>
      </Table>
    )
  }
}

export default SaleList
