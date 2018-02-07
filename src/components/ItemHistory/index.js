import React from 'react'
import PropTypes from 'prop-types'

// Components

import Row from './Row'

const ItemHistory = ({ history }) => {
  if (!history.length) return null

  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th scope='col'>Type</th>
          <th scope='col'>Cost</th>
          <th scope='col'>Price</th>
          <th scope='col'>Created</th>
          <th scope='col'>Ended</th>
        </tr>
      </thead>
      <tbody>
        {history.map(item => <Row  key={item.key} item={item} />)}
      </tbody>
    </table>
  )
}

ItemHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['purchase', 'listing', 'sale']),
    cost: PropTypes.number,
    price: PropTypes.number
  })).isRequired
}

export default ItemHistory
