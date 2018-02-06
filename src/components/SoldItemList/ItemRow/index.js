import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { calculateSalesInfo } from '../../../utils'

// Components

import ItemHistory from '../../ItemHistory'
import ItemSalesInfo from '../../ItemSalesInfo'

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
          {
            this.state.isHistoryExpanded
            ? <i className='fas fa-caret-up'></i>
            : <i className='fas fa-caret-down'></i>
          }
        </h4>
        {
          this.state.isHistoryExpanded
          ? <ItemHistory history={this.props.history} />
          : null
        }
        <ItemSalesInfo cost={cost} price={price} profit={profit} isSold />
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
