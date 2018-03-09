import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import uuid from 'uuid/v4'

// Components

import { Button, Container, Jumbotron } from 'reactstrap'
import AddItemModal from '../AddItemModal'

// Assets

import './AppHeader.css'

class AppHeader extends PureComponent {
  state = { isCreateExpanded: false }

  // Event handling

  handleClickAdd = (event) => {
    event.preventDefault()
    this.setState({ isCreateExpanded: true })
  }

  handleClickReset = () => {
    if (window.confirm('Are you sure want to reset item data?')) {
      this.props.onResetItems()
    }
  }

  handleCompleteCreate = ({ name, cost, stackable, vendorValue }) => {
    const newItem = {
      key: uuid(),
      name,
      vendorValue,
      stackable,
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
  }

  handleCloseModal = () => {
    this.setState({ isCreateExpanded: false })
  }

  // Rendering

  render () {
    return (
      <div className='c-AppHeader'>
        <Jumbotron fluid>
          <Container>
            <h1 className='display-4'>Auction House Magic</h1>
            <p className='lead'>
              Track your AH purchases, sales, history and profits.
            </p>
            <p>
              <Button
                color='primary'
                onClick={this.handleClickAdd}
              >
                Add Item
              </Button>
              <Button
                color='secondary'
                onClick={this.handleClickReset}
              >
                Reset
              </Button>
            </p>
            <AddItemModal
              open={this.state.isCreateExpanded}
              onComplete={this.handleCompleteCreate}
              onClose={this.handleCloseModal}
            />
          </Container>
        </Jumbotron>
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
