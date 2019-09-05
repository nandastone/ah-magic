import React, { PureComponent } from 'react'
import _ from 'lodash'
import moment from 'moment'
import classNames from 'classnames'

import { calculateListingFinances } from '../../utils'

// Context
import { InventoryContext } from '../../contexts/InventoryContext'

// Components

import { Table } from 'reactstrap'
import ItemRow from './ItemRow'
import TotalRow from '../TotalRow'

// Assets

import './SoldList.css'

/**
 * @todo Can this be refactored into SaleList with generic table component?
 */
class SoldList extends PureComponent {
  static contextType = InventoryContext

  state = {
    sortField: '',
    sortDirection: 'DESC',
  }

  // Event handling

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
    const items = this._sortItems(this.context.sold)

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
          {items.map(item => {
            return (
              <ItemRow
                key={item.id}
                item={item}
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

export default SoldList
