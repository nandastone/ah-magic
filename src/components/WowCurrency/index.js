import React from 'react'
import PropTypes from 'prop-types'

import { convertWowCurrency } from '../../utils'

// Assets

import './style.css'
import goldIcon from './gold.png'
import silverIcon from './silver.png'
import copperIcon from './copper.png'

const WowCurrency = ({ value }) => {
  const { gold, silver, copper } = convertWowCurrency(value)
  return (
    <span className='c-WowCurrency'>
      <span className='c-WowCurrency__coin c-WowCurrenct__coin--gold'>
        {gold}
        <img src={goldIcon} alt='Gold' />
      </span>
      <span className='c-WowCurrency__coin c-WowCurrenct__coin--silver'>
        {silver}
        <img src={silverIcon} alt='Silver' />
      </span>
      <span className='c-WowCurrency__coin c-WowCurrenct__coin--copper'>
        {copper}
        <img src={copperIcon} alt='Copper' />
      </span>
    </span>
  )
}

WowCurrency.propTypes = {
  value: PropTypes.number
}

export default WowCurrency
