import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

// Components

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ItemTitle from '../ItemTitle'
import ListItemForm from '../ListItemForm'

class ListItemModal extends PureComponent {
  // Event handling

  handleClickComplete = (event) => {
    event.preventDefault()
    this.formComponent.submit()
  }

  handleCompleteList = (payload) => {
    this.props.onComplete(payload)
    this.props.onClose()
  }

  // Rendering

  render () {
    const lastHistory = _.last(this.props.item.history)

    return (
      <Modal
        isOpen={this.props.open}
        toggle={this.props.onClose}
        size='lg'
      >
        <ModalHeader toggle={this.props.onClose}>
          Listing: <ItemTitle name={this.props.item.name} count={this.props.item.stackable} />
        </ModalHeader>
        <ModalBody>
          <ListItemForm
            defaultBid={lastHistory.bid}
            defaultPrice={lastHistory.price}
            onComplete={this.handleCompleteList}
            onCancel={this.props.onClose}
            ref={(component) => this.formComponent = component}
          />
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={this.handleClickComplete}>List</Button>
          <Button color='secondary' onClick={this.props.onClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

ListItemModal.defaultProps = {
  onComplete: () => {},
  onClose: () => {}
}

ListItemModal.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object.isRequired,
  onComplete: PropTypes.func,
  onClose: PropTypes.func
}

export default ListItemModal
