import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// Components

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import AddItemForm from '../AddItemForm'

class AddItemModal extends PureComponent {
  // Event handling

  handleClickComplete = (event) => {
    event.preventDefault()
    this.formComponent.submit()
  }

  handleCompleteCreate = (payload) => {
    this.props.onComplete(payload)
    this.props.onClose()
  }

  // Rendering

  render () {
    return (
      <Modal
        isOpen={this.props.open}
        toggle={this.props.onClose}
        size='lg'
      >
        <ModalHeader toggle={this.props.onClose}>
          Add Item
        </ModalHeader>
        <ModalBody>
          <AddItemForm
            onComplete={this.handleCompleteCreate}
            onCancel={this.props.onClose}
            ref={(component) => this.formComponent = component}
          />
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={this.handleClickComplete}>Add</Button>
          <Button color='secondary' onClick={this.props.onClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

AddItemModal.defaultProps = {
  onComplete: () => {},
  onClose: () => {}
}

AddItemModal.propTypes = {
  open: PropTypes.bool,
  onComplete: PropTypes.func,
  onClose: PropTypes.func
}

export default AddItemModal
