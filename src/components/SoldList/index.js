import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// Components

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
      <table className='c-SoldList table table-hover'>
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Cost</th>
            <th scope='col'>Price</th>
            <th scope='col'>Profit</th>
            <th scope='col'>Created</th>
            <th scope='col' colSpan={2}>Sold</th>
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
      </table>
    )
  }
}

SoldList.propTypes = {
  items: PropTypes.array
}

export default SoldList
