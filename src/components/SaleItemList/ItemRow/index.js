import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import moment from 'moment'

import { calculateItemFinances } from '../../../utils'

// Components

import ItemDetailModal from '../../ItemDetailModal'
import ItemTitle from '../../ItemTitle'
import ListItemForm from '../../ListItemForm'
import SoldItemForm from '../../SoldItemForm'
import WowCurrency from '../../WowCurrency'

// Assets

import './ItemRow.css'

class ItemRow extends PureComponent {
  state = {
    isDetailsExpanded: false,
    isListExpanded: false,
    isSoldExpanded: false
  }

  // Event handling

  handleClickRow = (event) => {
    event.preventDefault()
    this.setState({ isDetailsExpanded: true })
  }

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

  handleClickDelete = () => {
    if (window.confirm('Are you sure want to delete this item?')) {
      this.props.onDelete()
    }
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

  handleCloseDetailModal = () => {
    this.setState({ isDetailsExpanded: false })
  }

  // Rendering

  render () {
    const firstHistory = _.first(this.props.item.history)
    const lastHistory = _.last(this.props.item.history)
    const isListed = lastHistory && lastHistory.type === 'listing' && !lastHistory.endedAt
    const { cost, price, profit } = calculateItemFinances(this.props.item.history)

    return (
      <tr
        className={classNames(
          'c-ItemRow',
          { 'table-info': isListed }
        )}
        onClick={this.handleClickRow}
      >
        <td>
          <React.Fragment>
            <ItemTitle item={this.props.item} />
            <ItemDetailModal
              item={this.props.item}
              open={this.state.isDetailsExpanded}
              onClose={this.handleCloseDetailModal}
            />
          </React.Fragment>
        </td>
        <td>
          <WowCurrency value={cost} />
        </td>
        <td>
          <WowCurrency value={price} />
        </td>
        <td>
          <WowCurrency value={profit} />
        </td>
        <td>
          {moment(firstHistory.createdAt).format('D MMM YYYY, h:mm:ss a')}
        </td>
        <td>
          {moment(lastHistory.updatedAt || lastHistory.createdAt).format('D MMM YYYY, h:mm:ss a')}
        </td>
        <td>
          <div className='btn-group btn-group-sm'>
            {
              !isListed
              ? <button
                  className='btn btn-secondary'
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
              className='btn btn-primary'
              onClick={this.handleClickSold}
            >
              Sold
            </button>
            <button
              className='btn btn-danger'
              onClick={this.handleClickDelete}
            >
              Delete
            </button>
          </div>

          {
            this.state.isListExpanded
            ? <ListItemForm
                defaultBid={_.get(lastHistory, 'bid')}
                defaultPrice={_.get(lastHistory, 'price')}
                onComplete={this.handleCompleteList}
                onCancel={this.handleCancelList}
              />
            : null
          }
          {
            this.state.isSoldExpanded
            ? <SoldItemForm
                defaultBid={_.get(lastHistory, 'bid')}
                defaultPrice={_.get(lastHistory, 'price')}
                defaultVendorValue={this.props.item.vendorValue}
                defaultSaleType={!isListed ? 'private' : 'ah'}
                onComplete={this.handleCompleteSold}
                onCancel={this.handleCancelSold}
              />
            : null
          }
        </td>
      </tr>
    )
  }
}

ItemRow.defaultProps = {
  onList: () => {},
  onSold: () => {},
  onEnd: () => {},
  onDelete: () => {}
}

ItemRow.propTypes = {
  item: PropTypes.object.isRequired,
  onList: PropTypes.func,
  onSold: PropTypes.func,
  onEnd: PropTypes.func,
  onDelete: PropTypes.func
}

export default ItemRow
