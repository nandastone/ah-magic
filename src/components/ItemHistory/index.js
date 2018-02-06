import React from 'react'
import PropTypes from 'prop-types'

// Components

import WowCurrency from '../WowCurrency'

const ItemHistory = ({ history }) => {
  if (!history.length) return null

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Type</th>
          <th>Cost</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {history.map(item => (
          <tr key={item.key}>
            <td>{item.type}</td>
            <td><WowCurrency value={item.cost} /></td>
            <td><WowCurrency value={item.price} /></td>
          </tr>
        ))}
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
