import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// Components

import { Table } from 'reactstrap'
import ItemRow from './ItemRow'

// Assets

import './SoldList.css'

class SoldList extends PureComponent {
  // Event handling

  handleDeleteItem = (item) => {
    this.props.onDeleteItem(item)
  }

  // Rendering

  render () {
    return (
      <Table hover className='c-SoldList'>
        <thead>
          <tr>
            <th className='w-25'>Name</th>
            <th className='w-10'>Cost</th>
            <th className='w-10'>Price</th>
            <th className='w-10'>Profit</th>
            <th className='w-15'>Created</th>
            <th className='w-15'>Sold</th>
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
                onDelete={() => this.handleDeleteItem(item)}
              />
            )
          })}
        </tbody>
      </Table>
    )
  }
}

SoldList.propTypes = {
  items: PropTypes.array
}

export default SoldList
