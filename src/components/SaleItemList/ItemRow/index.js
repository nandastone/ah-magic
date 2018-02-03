import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'

import { calculateSalesInfo, formatWowCurrency } from '../../../utils'

// Components

import ItemHistory from '../../ItemHistory'
import ListItemForm from '../../ListItemForm'
import SoldItemForm from '../../SoldItemForm'

class ItemRow extends PureComponent {
  state = {
    isHistoryExpanded: false,
    isListExpanded: false,
    isSoldExpanded: false
  }

  // Event handling

  handleClickList = () => {
    this.setState({
      isListExpanded: true,
      isSoldExpanded: false
    })
  }

  handleClickSold = () => {
    this.setState({
      isSoldExpanded: true,
      isListExpanded: false
    })
  }

  handleClickHistory = () => {
    this.setState((prevState, props) => {
      return { isHistoryExpanded: !prevState.isHistoryExpanded }
    })
  }

  handleCompleteList = (payload) => {
    this.props.onList(payload)
    this.setState({ isListExpanded: false })
  }

  handleCancelList = () => {
    this.setState({ isListExpanded: false })
  }

  handleCompleteSold = (payload) => {
    this.props.onSold(payload)
    this.setState({ isSoldExpanded: false })
  }

  handleCancelSold = () => {
    this.setState({ isSoldExpanded: false })
  }

  // Rendering

  render () {
    const lastHistory = _.last(this.props.history)
    // const lastHistoryType = _.get(_.last(this.props.history), 'type')
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
        <p>
          <span className='badge badge-secondary mr-1'>
            Cost: {formatWowCurrency(cost)}
          </span>
          {
            price
            ? <span className='badge badge-secondary mr-1'>
                Sale: {formatWowCurrency(price)}
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
                Profit: {formatWowCurrency(profit)}
              </span>
            : null
          }
        </p>
        {
          this.state.isListExpanded
          ? <ListItemForm
              defaultPrice={_.get(lastHistory, 'price')}
              onComplete={this.handleCompleteList}
              onCancel={this.handleCancelList}
            />
          : null
        }
        {
          this.state.isSoldExpanded
          ? <SoldItemForm
              defaultPrice={_.get(lastHistory, 'price')}
              onComplete={this.handleCompleteSold}
              onCancel={this.handleCancelSold}
            />
          : null
        }
        <div className='btn-group btn-group-sm'>
          <button
            className='btn btn-primary'
            onClick={this.handleClickList}
          >
            List
          </button>
          <button
            className='btn btn-primary'
            onClick={this.handleClickSold}
          >
            Sold
          </button>
        </div>
      </div>
    )
  }
}

ItemRow.defaultProps = {
  onList: () => {},
  onSold: () => {}
}

ItemRow.propTypes = {
  name: PropTypes.string.isRequired,
  // Refer to `<ItemHistory />` props for shape.
  history: PropTypes.array.isRequired,
  onList: PropTypes.func,
  onSold: PropTypes.func
}

export default ItemRow
