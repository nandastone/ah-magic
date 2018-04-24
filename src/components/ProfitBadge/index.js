import React from 'react'
import PropTypes from 'prop-types'

// Components

import { Badge } from 'reactstrap'
import WowCurrency from '../WowCurrency'

const ProfitBadge = ({ profit }) => {
  let badgeColor = 'secondary'
  if (profit > 0) {
    badgeColor = 'success'
  } else if (profit < 0) {
    badgeColor = 'danger'
  }
  return (
    <Badge color={badgeColor}>
      {profit < 0 ? '-' : ''}
      <WowCurrency value={Math.abs(profit)} />
    </Badge>
  )
}

ProfitBadge.propTypes = {
  profit: PropTypes.number
}

export default ProfitBadge
