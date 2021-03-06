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
import WowCurrency from '../../WowCurrency'

class ItemRow extends PureComponent {
  state = {
    isDetailsExpanded: false
  }

  // Event handling

  handleClickRow = (event) => {
    event.preventDefault()
    this.setState({ isDetailsExpanded: true })
  }

  handleClickDelete = (event) => {
    event.stopPropagation()
    if (window.confirm('Are you sure want to delete this item?')) {
      this.props.onDelete()
    }
  }

  handleCloseModal = () => {
    this.setState({ isDetailsExpanded: false })
  }

  // Rendering

  render () {
    const firstHistory = _.first(this.props.item.history)
    const lastHistory = _.last(this.props.item.history)
    const { cost, price, profit } = calculateListingFinances(this.props.item.history)

    return (
      <tr
        className={'c-SoldList__row'}
        onClick={this.handleClickRow}
      >
        <td>
          <React.Fragment>
            <ItemTitle name={this.props.item.name} count={this.props.item.stackable} />
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
