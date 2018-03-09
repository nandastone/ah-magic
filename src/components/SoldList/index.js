import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// Components

import ItemRow from './ItemRow'

class SoldList extends PureComponent {
  render () {
    return (
      <div>
        {this.props.items.map((item) => {
          return (
            <ItemRow
              key={item.key}
              item={item}
            />
          )
        })}
      </div>
    )
  }
}

SoldList.propTypes = {
  items: PropTypes.array
}

export default SoldList
