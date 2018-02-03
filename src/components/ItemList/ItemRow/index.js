import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

// Components

import ItemHistory from '../ItemHistory'
import ListItemForm from '../../ListItemForm'

class ItemRow extends PureComponent {
  state = {
    isHistoryExpanded: false,
    isListExpanded: false
  }

  // Event handling

  handleClickList = () => {
    this.setState({ isListExpanded: true })
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

  // Rendering

  render () {
    const lastHistory = _.last(this.props.history)

    return (
      <div>
        <h3>{this.props.name}</h3>
        <button onClick={this.handleClickHistory}>
          {this.state.isHistoryExpanded ? 'Hide' : 'Show'} History
        </button>
        {
          this.state.isHistoryExpanded
          ? <ItemHistory history={this.props.history} />
          : null
        }
        {
          this.state.isListExpanded
          ? <ListItemForm
              defaultPrice={_.get(lastHistory, 'price')}
              onComplete={this.handleCompleteList}
              onCancel={this.handleCancelList}
            />
          : null
        }
        <ul className='actions'>
          <li>
            <button onClick={this.handleClickList}>
              List
            </button>
          </li>
          <li>
            <button onClick={(event) => this.props.onSold()}>
              Sold
            </button>
          </li>
        </ul>
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
