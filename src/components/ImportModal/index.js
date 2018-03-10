import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// Components

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap'
import ImportDataForm from '../ImportDataForm'

// Assets

import './ImportModal.css'

class ImportModal extends PureComponent {
  // Event handling

  handleClickComplete = (event) => {
    event.preventDefault()
    this.formComponent.submit()
  }

  handleCompleteForm = (payload) => {
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
        className='c-ImportModal'
      >
        <ModalHeader toggle={this.props.onClose}>
          Import Data
        </ModalHeader>
        <ModalBody>
          <ImportDataForm
            onComplete={this.handleCompleteForm}
            onCancel={this.props.onClose}
            ref={(component) => this.formComponent = component}
          />
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={this.handleClickComplete}>Import</Button>
          <Button color='secondary' onClick={this.props.onClose}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

ImportModal.defaultProps = {
  onComplete: () => {},
  onClose: () => {}
}

ImportModal.propTypes = {
  open: PropTypes.bool,
  onComplete: PropTypes.func,
  onClose: PropTypes.func
}

export default ImportModal
