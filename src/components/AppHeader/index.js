import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'
import moment from 'moment'

// Components

import CreateItemForm from '../CreateItemForm'

// Assets

import './AppHeader.css'

class AppHeader extends PureComponent {
  state = { isCreateExpanded: false }

  // Event handling

  handleClickAdd = () => {
    this.setState({ isCreateExpanded: true })
  }

  handleClickReset = () => {
    if (window.confirm('Are you sure want to reset item data?')) {
      this.props.onResetItems()
    }
  }

  handleCompleteCreate = ({ name, cost, vendorValue }) => {
    const newItem = {
      key: uuid(),
      name,
      vendorValue,
      history: [
        {
          key: uuid(),
          type: 'purchase',
          cost,
          createdAt: moment().format()
        }
      ]
    }
    this.props.onCreateItem(newItem)
    this.setState({ isCreateExpanded: false })
  }

  handleCancelCreate = () => {
    this.setState({ isCreateExpanded: false })
  }

  // Rendering

  render () {
    return (
      <div className='c-AppHeader'>
        <div className='jumbotron'>
          <div className='container'>
            <h1>Auction House Magic</h1>
            <p>
              <button
                className='btn btn-primary'
                onClick={this.handleClickAdd}
              >
                Add Item
              </button>
              <button
                className='btn btn-secondary'
                onClick={this.handleClickReset}
              >
                Reset
              </button>
            </p>
            {
              this.state.isCreateExpanded
              ? <CreateItemForm
                  onComplete={this.handleCompleteCreate}
                  onCancel={this.handleCancelCreate}
                />
              : null
            }
          </div>
        </div>
      </div>
    )
  }
}

AppHeader.defaultProps = {
  onCreateItem: () => {},
  onResetItems: () => {}
}

AppHeader.propTypes = {
  onCreateItem: PropTypes.func,
  onResetItems: PropTypes.func
}

export default AppHeader
