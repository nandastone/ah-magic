import React from 'react'
import PropTypes from 'prop-types'

import { calculateListingFinances } from '../../utils'

// Components

import ProfitBadge from '../ProfitBadge'
import WowCurrency from '../WowCurrency'

// Assets

import './TotalRow.css'

const TotalRow = ({ items }) => {
  const totals = { cost: 0, price: 0, profit: 0 }
  items.forEach(item => {
    const { cost, price, profit } = calculateListingFinances(item.history)
    totals.cost += cost
    totals.price += price
    totals.profit += profit
  })
  return (
    <tr className='c-TotalRow'>
      <td>
        <strong>Total</strong>
      </td>
      <td>
        <WowCurrency value={totals.cost} />
      </td>
      <td>
        <WowCurrency value={totals.price} />
      </td>
      <td colSpan={4}>
        <ProfitBadge profit={totals.profit} />
      </td>
    </tr>
  )
}

TotalRow.defaultProps = {
  items: []
}

TotalRow.propTypes = {
  items: PropTypes.array
}

export default TotalRow
