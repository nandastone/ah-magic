import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Components

import WowCurrency from '../WowCurrency'

const ItemSalesInfo = ({ cost, price, profit, isSold }) => {
  return (
    <p>
      <span className='badge badge-light mr-1'>
        Cost:{' '}
        <WowCurrency value={cost} />
      </span>
      {
        price
        ? <span className='badge badge-light mr-1'>
            {isSold ? 'Sold' : 'Sale'}:{' '}
            <WowCurrency value={price} />
          </span>
        : null
      }
      {
        price
        ? <span className={classNames(
            'badge',
            {
              'badge-success': profit > 0,
              'badge-danger': profit < 0
            }
          )}>
            {isSold ? (profit > 0 ? 'Profit' : 'Loss') : 'Forecast'}:{' '}
            <WowCurrency value={profit} />
          </span>
        : null
      }
    </p>
  )
}

ItemSalesInfo.propTypes = {
  cost: PropTypes.number,
  price: PropTypes.number,
  profit: PropTypes.number,
  isSold: PropTypes.bool
}

export default ItemSalesInfo
