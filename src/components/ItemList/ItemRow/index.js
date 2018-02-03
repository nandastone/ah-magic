import React from 'react'
import PropTypes from 'prop-types'

// Components

import ItemHistory from '../ItemHistory'

const ItemRow = ({ name, history, onList, onSold }) => {
  return (
    <div>
      <h3>{name}</h3>
      <ItemHistory history={history} />
      <ul className='actions'>
        <li>
          <button onClick={(event) => onList(500)}>
            List
          </button>
        </li>
        <li>
          <button onClick={(event) => onSold()}>
            Sold
          </button>
        </li>
      </ul>
    </div>
  )
}

ItemRow.defaultProps = {
  onList: () => {},
  onSold: () => {}
}

ItemRow.propTypes = {
  name: PropTypes.string.isRequired,
  // Refer to `<ItemHistory />` props for shape.
  history: PropTypes.array.isRequired,
  onList: PropTypes.func,
  onSold: PropTypes.func
}

export default ItemRow
