import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'

import { calculateSalesInfo } from '../../../utils'

// Components

import ItemHistory from '../../ItemHistory'
import ItemSalesInfo from '../../ItemSalesInfo'
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

  handleClickEnd = () => {
    this.props.onEnd()
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
    const isListed = lastHistory && lastHistory.type === 'listing' && !lastHistory.endedAt
    const { cost, price, profit } = calculateSalesInfo(this.props.history)

    return (
      <div className={classNames(
        'alert',
        {
          'alert-info': isListed
        }
      )}>
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
        <ItemSalesInfo cost={cost} price={price} profit={profit} />
        <div className='btn-group btn-group-sm'>
          {
            !isListed
            ? <button
                className='btn btn-primary'
                onClick={this.handleClickList}
              >
                List
              </button>
            : <button
                className='btn btn-secondary'
                onClick={this.handleClickEnd}
              >
                End
              </button>
          }
          <button
            className='btn btn-secondary'
            onClick={this.handleClickSold}
          >
            Sold
          </button>
        </div>
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
              defaultVendored={!isListed}
              onComplete={this.handleCompleteSold}
              onCancel={this.handleCancelSold}
            />
          : null
        }
      </div>
    )
  }
}

ItemRow.defaultProps = {
  onList: () => {},
  onSold: () => {},
  onEnd: () => {},
}

ItemRow.propTypes = {
  name: PropTypes.string.isRequired,
  // Refer to `<ItemHistory />` props for shape.
  history: PropTypes.array.isRequired,
  onList: PropTypes.func,
  onSold: PropTypes.func,
  onEnd: PropTypes.func
}

export default ItemRow
