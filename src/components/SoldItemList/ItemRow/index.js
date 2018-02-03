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
      <div className={classNames(
        'alert',
        {
          'alert-success': profit > 0,
          'alert-danger': profit < 0
        }
      )}>
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
          Cost: {formatWowCurrency(cost)}<br />
          Sale: {formatWowCurrency(price)}<br />
          Profit: {formatWowCurrency(profit)}
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
