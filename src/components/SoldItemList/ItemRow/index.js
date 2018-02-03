import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// Components

import ItemHistory from '../../ItemHistory'

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
    return (
      <div>
        <h4>{this.props.name}</h4>
        <button onClick={this.handleClickHistory}>
          {this.state.isHistoryExpanded ? 'Hide' : 'Show'} History
        </button>
        {
          this.state.isHistoryExpanded
          ? <ItemHistory history={this.props.history} />
          : null
        }
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
