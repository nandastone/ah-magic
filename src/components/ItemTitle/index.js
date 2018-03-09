import React from 'react'
import PropTypes from 'prop-types'

const ItemTitle = ({ item }) => {
  return (
    <React.Fragment>
      {item.name}{' '}
      {
        item.stackable > 1
        ? <small className='text-muted'>x{item.stackable}</small>
        : null
      }
    </React.Fragment>
  )
}

ItemTitle.propTypes = {
  item: PropTypes.object.isRequired
}

export default ItemTitle
