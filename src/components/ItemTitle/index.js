import React from 'react'
import PropTypes from 'prop-types'

const ItemTitle = ({
  name,
  count
}) => {
  return (
    <React.Fragment>
      <span data-test='name'>{name}</span>
      {' '}
      {
        count > 1
        ? <small className='text-muted' data-test='count'>x{count}</small>
        : null
      }
    </React.Fragment>
  )
}

ItemTitle.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number
}

export default ItemTitle
