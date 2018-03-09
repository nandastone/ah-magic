import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

// Components

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ItemTitle from '../ItemTitle'
import SellItemForm from '../SellItemForm'

class SellItemModal extends PureComponent {
  // Event handling

  handleClickComplete = (event) => {
    event.preventDefault()
    this.formComponent.submit()
  }

  handleCompleteSold = (payload) => {
    this.props.onComplete(payload)
    this.props.onClose()
  }

  // Rendering

  render () {
    const lastHistory = _.last(this.props.item.history)
    const isListed = lastHistory && lastHistory.type === 'listing' && !lastHistory.endedAt

    return (
      <Modal
        isOpen={this.props.open}
        toggle={this.props.onClose}
        size='lg'
      >
        <ModalHeader toggle={this.props.onClose}>
          Sold: <ItemTitle item={this.props.item} />
        </ModalHeader>
        <ModalBody>
          <SellItemForm
            defaultBid={lastHistory.bid}
            defaultPrice={lastHistory.price}
            defaultVendorValue={this.props.item.vendorValue}
            defaultSaleType={!isListed ? 'private' : 'ah'}
            onComplete={this.handleCompleteSold}
            onCancel={this.props.onClose}
            ref={(component) => this.formComponent = component}
          />
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={this.handleClickComplete}>Sold</Button>
          <Button color='secondary' onClick={this.props.onClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

SellItemModal.defaultProps = {
  onComplete: () => {},
  onClose: () => {}
}

SellItemModal.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object.isRequired,
  onComplete: PropTypes.func,
  onClose: PropTypes.func
}

export default SellItemModal
