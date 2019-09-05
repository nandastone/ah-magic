import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'

import { calculateListingFinances } from '../../../utils'

// Components

import { Button, ButtonGroup } from 'reactstrap'
import ProfitBadge from '../../ProfitBadge'
import ItemDetailModal from '../../ItemDetailModal'
import ItemTitle from '../../ItemTitle'
import ListItemModal from '../../ListItemModal'
import SellItemModal from '../../SellItemModal'
import WowCurrency from '../../WowCurrency'

class ItemRow extends PureComponent {
  state = {
    isDetailsExpanded: false,
    isListExpanded: false,
    isSoldExpanded: false,
  }

  // Event handling

  handleClickRow = event => {
    event.preventDefault()
    this.setState({ isDetailsExpanded: true })
  }

  handleClickList = event => {
    event.stopPropagation()
    this.setState({ isListExpanded: true })
  }

  handleClickEnd = event => {
    event.stopPropagation()
    this.props.onEnd()
  }

  handleClickSold = event => {
    event.stopPropagation()
    this.setState({ isSoldExpanded: true })
  }

  handleClickDelete = event => {
    event.stopPropagation()
    if (window.confirm('Are you sure want to delete this item?')) {
      this.props.onDelete()
    }
  }

  handleCompleteList = payload => {
    this.props.onList(payload)
  }

  handleCompleteSold = payload => {
    this.props.onSold(payload)
  }

  handleCloseModal = () => {
    this.setState({
      isDetailsExpanded: false,
      isListExpanded: false,
      isSoldExpanded: false,
    })
  }

  // Rendering

  render() {
    const firstHistory = _.first(this.props.item.history)
    const lastHistory = _.last(this.props.item.history)
    const isListed =
      lastHistory && lastHistory.type === 'listing' && !lastHistory.endedOn
    const { cost, price, profit } = calculateListingFinances(
      this.props.item.history
    )
    const createdOn = firstHistory ? firstHistory.createdOn : null
    const updatedOn = lastHistory
      ? lastHistory.endedOn || lastHistory.createdOn
      : null

    return (
      <tr className={'c-ForSaleList__row'} onClick={this.handleClickRow}>
        <td>
          <React.Fragment>
            <ItemTitle
              name={this.props.item.name}
              count={this.props.item.stackable}
            />
            <ItemDetailModal
              item={this.props.item}
              open={this.state.isDetailsExpanded}
              onClose={this.handleCloseModal}
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
          <ProfitBadge profit={profit} />
        </td>
        <td>
          {createdOn ? (
            <span
              title={moment(createdOn).format('D MMM YYYY, h:mm:ss a')}
              data-test="created-at"
            >
              {moment(createdOn).format('D MMM YYYY')}
            </span>
          ) : null}
        </td>
        <td>
          {updatedOn ? (
            <span
              title={moment(updatedOn).format('D MMM YYYY, h:mm:ss a')}
              data-test="updated-at"
            >
              {moment(updatedOn).format('D MMM YYYY')}
            </span>
          ) : null}
        </td>
        <td>
          <ButtonGroup size="sm">
            {!isListed ? (
              <Button
                color="secondary"
                onClick={this.handleClickList}
                data-test="list-button"
              >
                List
              </Button>
            ) : (
              <Button
                color="secondary"
                onClick={this.handleClickEnd}
                data-test="end-button"
              >
                End
              </Button>
            )}
            <Button
              color="primary"
              onClick={this.handleClickSold}
              data-test="sold-button"
            >
              Sold
            </Button>
            <Button
              color="danger"
              onClick={this.handleClickDelete}
              data-test="delete-button"
            >
              Delete
            </Button>
          </ButtonGroup>
          <ListItemModal
            item={this.props.item}
            open={this.state.isListExpanded}
            onComplete={this.handleCompleteList}
            onClose={this.handleCloseModal}
          />
          <SellItemModal
            item={this.props.item}
            open={this.state.isSoldExpanded}
            onComplete={this.handleCompleteSold}
            onClose={this.handleCloseModal}
          />
        </td>
      </tr>
    )
  }
}

ItemRow.defaultProps = {
  onList: () => {},
  onSold: () => {},
  onEnd: () => {},
  onDelete: () => {},
}

ItemRow.propTypes = {
  item: PropTypes.object.isRequired,
  onList: PropTypes.func,
  onSold: PropTypes.func,
  onEnd: PropTypes.func,
  onDelete: PropTypes.func,
}

export default ItemRow
