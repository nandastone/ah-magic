import React from 'react'
import PropTypes from 'prop-types'

// Components

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ItemHistory from '../ItemHistory'
import ItemTitle from '../ItemTitle'
import WowCurrency from '../WowCurrency'

const ItemDetailModal = ({ open, item, onClose }) => {
  return (
    <Modal
      isOpen={open}
      toggle={onClose}
      size='lg'
    >
      <ModalHeader toggle={onClose}>
        <ItemTitle name={item.name} count={item.stackable} />
      </ModalHeader>
      <ModalBody>
        <ItemHistory history={item.history} />
        <h4>Details</h4>
        <p>Vendor Price: <WowCurrency value={item.vendorValue} /></p>
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={onClose}>Close</Button>
      </ModalFooter>
    </Modal>
  )
}

ItemDetailModal.defaultProps = {
  onClose: () => {}
}

ItemDetailModal.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func
}

export default ItemDetailModal
