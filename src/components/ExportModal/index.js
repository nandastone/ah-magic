import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// Components

import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap'

// Assets

import './ExportModal.css'

class ExportModal extends PureComponent {
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
        className='c-ExportModal'
      >
        <ModalHeader toggle={this.props.onClose}>
          Export Data
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => event.preventDefault()}>
            <FormGroup>
              <Label for='data'>Data</Label>
              <Input
                name='data'
                value={JSON.stringify(this.props.appState)}
                type='textarea'
                id='data'
                readOnly
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={this.props.onClose}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

ExportModal.defaultProps = {
  onClose: () => {}
}

ExportModal.propTypes = {
  open: PropTypes.bool,
  appState: PropTypes.object,
  onClose: PropTypes.func
}

export default ExportModal
