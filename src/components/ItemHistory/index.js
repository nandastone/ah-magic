import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'

// Components

import WowCurrency from '../WowCurrency'

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
        {history.map(item => (
          <tr key={item.key}>
            <td>
              {_.capitalize(item.type)}
              {item.isVendored ? ' (Vendored)' : ''}
            </td>
            <td>
              <WowCurrency value={item.cost} />
            </td>
            <td>
              {
                item.bid
                ? <div>
                    Bid:{' '}
                    <WowCurrency value={item.bid} />
                  </div>
                : null
              }
              {
                item.price
                ? <div>
                    Price:{' '}
                    <WowCurrency value={item.price} />
                  </div>
                : null
              }
            </td>
            <td>
              {
                item.createdAt
                ? <span>
                    {moment(item.createdAt).format('D MMM YYYY, h:mm:ss a')}
                    {item.duration ? ` (${item.duration} hours)` : ''}
                  </span>
                : null
              }
            </td>
            <td>
              {
                item.endedAt
                ? moment(item.endedAt).format('D MMM YYYY, h:mm:ss a')
                : null
              }
            </td>
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
