import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

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

    return (
      <div>
        <h4 onClick={this.handleClickHistory}>
          {this.props.name}{' '}
          {this.state.isHistoryExpanded ? '^' : 'v'}
        </h4>
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
        {
          this.state.isSoldExpanded
          ? <SoldItemForm
              defaultPrice={_.get(lastHistory, 'price')}
              onComplete={this.handleCompleteSold}
              onCancel={this.handleCancelSold}
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
            <button onClick={this.handleClickSold}>
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
