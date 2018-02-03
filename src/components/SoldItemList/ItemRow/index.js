import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { calculateSalesInfo, formatWowCurrency } from '../../../utils'

// Components

import ItemHistory from '../../ItemHistory'

class ItemRow extends PureComponent {
  state = {
    isHistoryExpanded: false
  }

  // Event handling

  handleClickHistory = () => {
    this.setState((prevState, props) => {
      return { isHistoryExpanded: !prevState.isHistoryExpanded }
    })
  }

  // Rendering

  render () {
    const { cost, price, profit } = calculateSalesInfo(this.props.history)

    return (
      <div className='alert'>
        <h4 onClick={this.handleClickHistory}>
          {this.props.name}{' '}
          {this.state.isHistoryExpanded ? '^' : 'v'}
        </h4>
        {
          this.state.isHistoryExpanded
          ? <ItemHistory history={this.props.history} />
          : null
        }
        <p className='mb-0'>
          <span className='badge badge-secondary mr-1'>
            Cost: {formatWowCurrency(cost)}
          </span>
          <span className='badge badge-secondary mr-1'>
            Sale: {formatWowCurrency(price)}
          </span>
          <span className={classNames(
            'badge',
            {
              'badge-success': profit > 0,
              'badge-danger': profit < 0
            }
          )}>
            Profit: {formatWowCurrency(profit)}
          </span>
        </p>
      </div>
    )
  }
}

ItemRow.propTypes = {
  name: PropTypes.string.isRequired,
  // Refer to `<ItemHistory />` props for shape.
  history: PropTypes.array.isRequired
}

export default ItemRow
