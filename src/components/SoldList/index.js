import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import classNames from 'classnames'

import { calculateListingFinances } from '../../utils'

// Components

import { Table } from 'reactstrap'
import ItemRow from './ItemRow'
import TotalRow from '../TotalRow'

// Assets

import './SoldList.css'

class SoldList extends PureComponent {
  state = {
    sortField: '',
    sortDirection: 'DESC',
  }

  // Event handling

  handleDeleteItem = item => {
    this.props.onDeleteItem(item)
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

  _getSortedItems(items) {
    const { sortField: field, sortDirection: direction } = this.state
    let sorted = [...items]

    switch (field) {
      case 'name':
        sorted = _.sortBy(items, ['name'])
        if (direction === 'DESC') sorted.reverse()
        break
      case 'cost':
        sorted = _.sortBy(items, item => {
          const { cost } = calculateListingFinances(item.history)
          return cost || 0
        })
        if (direction === 'DESC') sorted.reverse()
        break
      case 'price':
        sorted = _.sortBy(items, item => {
          const { price } = calculateListingFinances(item.history)
          return price || 0
        })
        if (direction === 'DESC') sorted.reverse()
        break
      case 'profit':
        sorted = _.sortBy(items, item => {
          const { profit } = calculateListingFinances(item.history)
          return profit || 0
        })
        if (direction === 'DESC') sorted.reverse()
        break
      case 'createdOn':
        sorted = _.sortBy(items, item => {
          const firstHistory = _.first(item.history)
          return firstHistory.createdOn
            ? moment(firstHistory.createdOn).format('X')
            : 0
        })
        if (direction === 'DESC') sorted.reverse()
        break
      case 'updatedOn':
        sorted = _.sortBy(items, item => {
          const lastHistory = _.last(item.history)
          const updatedOn = lastHistory.endedOn || lastHistory.createdOn
          return updatedOn ? moment(updatedOn).format('X') : 0
        })
        if (direction === 'DESC') sorted.reverse()
        break
      default:
        throw new Error(
          `Invalid sorting column passed to ForSaleList: ${field}`
        )
    }

    return sorted
  }

  // Rendering

  render() {
    const sortedItems = this.state.sortField
      ? this._getSortedItems(this.props.items)
      : this.props.items
    return (
      <Table hover className="c-SoldList">
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
              Sold
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
          {sortedItems.map(item => {
            return (
              <ItemRow
                key={item.key}
                item={item}
                onDelete={() => this.handleDeleteItem(item)}
              />
            )
          })}
          <TotalRow items={sortedItems} />
        </tbody>
      </Table>
    )
  }
}

SoldList.propTypes = {
  items: PropTypes.array,
}

export default SoldList
