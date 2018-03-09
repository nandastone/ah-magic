import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'

import { calculateItemFinances } from '../../../utils'

// Components

import { Badge, Button, ButtonGroup } from 'reactstrap'
import ItemDetailModal from '../../ItemDetailModal'
import ItemTitle from '../../ItemTitle'
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

  handleClickDelete = (event) => {
    event.stopPropagation()
    if (window.confirm('Are you sure want to delete this item?')) {
      this.props.onDelete()
    }
  }

  // Rendering

  render () {
    const firstHistory = _.first(this.props.item.history)
    const lastHistory = _.last(this.props.item.history)
    const { cost, price, profit } = calculateItemFinances(this.props.item.history)

    return (
      <tr
        className={'c-SoldList__row'}
        onClick={this.handleClickRow}
      >
        <td>
          <React.Fragment>
            <ItemTitle item={this.props.item} />
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
          <Badge color={profit > 0 ? 'success' : 'danger'}>
            {profit <= 0 ? '-' : ''}
            <WowCurrency value={profit} />
          </Badge>
        </td>
        <td>
          <span title={moment(firstHistory.createdAt).format('D MMM YYYY, h:mm:ss a')}>
            {moment(firstHistory.createdAt).format('D MMM YYYY')}
          </span>
        </td>
        <td>
          <span title={moment(lastHistory.createdAt).format('D MMM YYYY, h:mm:ss a')}>
            {moment(lastHistory.createdAt).format('D MMM YYYY')}
          </span>
        </td>
        <td>
          <ButtonGroup size='sm'>
            <Button
              color='danger'
              onClick={this.handleClickDelete}
            >
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    )
  }
}

ItemRow.defaultProps = {
  onDelete: () => {}
}

ItemRow.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func
}

export default ItemRow
