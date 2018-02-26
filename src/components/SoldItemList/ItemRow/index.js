import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { calculateItemFinances } from '../../../utils'

// Components

import ItemHistory from '../../ItemHistory'
import ItemSalesInfo from '../../ItemSalesInfo'
import WowCurrency from '../../WowCurrency'

class ItemRow extends PureComponent {
  state = {
    isDetailsExpanded: false
  }

  // Event handling

  handleClickHistory = () => {
    this.setState((prevState, props) => {
      return { isDetailsExpanded: !prevState.isDetailsExpanded }
    })
  }

  // Rendering

  render () {
    const { cost, price, profit } = calculateItemFinances(this.props.item.history)

    return (
      <div className='alert'>
        <h4 onClick={this.handleClickHistory}>
          {this.props.item.name}{' '}
          {
            this.props.item.stackable
            ? <small className='text-muted'>x{this.props.item.stackable}</small>
            : null
          }
          <span className='ml-2'>
            {
              this.state.isDetailsExpanded
              ? <i className='fas fa-caret-up'></i>
              : <i className='fas fa-caret-down'></i>
            }
          </span>
        </h4>
        <ItemSalesInfo cost={cost} price={price} profit={profit} isSold />
        {
          this.state.isDetailsExpanded
          ? <div>
              <ItemHistory history={this.props.item.history} />
              <p>
                Vendor Price: <WowCurrency value={this.props.item.vendorValue} />
              </p>
            </div>
          : null
        }
      </div>
    )
  }
}

ItemRow.propTypes = {
  item: PropTypes.object.isRequired
}

export default ItemRow
