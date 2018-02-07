import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'

// Components

import WowCurrency from '../../WowCurrency'

const Row = ({ item }) => {
  const prettySaleType = {
    ah: 'Auction House',
    private: 'Private',
    vendor: 'Vendor'
  }[item.saleType]

  return (
    <tr>
      <td>
        {_.capitalize(item.type)}
        {
          item.type === 'sale'
          ? ` (${prettySaleType})`
          : null
        }
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
  )
}

Row.propTypes = {
  item: PropTypes.object
}

export default Row
