import React from 'react'
import PropTypes from 'prop-types'

// Components

import AppHeader from '../AppHeader'
import SaleItemList from '../SaleItemList'
import SoldItemList from '../SoldItemList'

const AppScreen = ({ saleInventory, soldInventory, onCreateItem, onChangeItem, onResetItems }) => {
  return (
    <div className='c-AppScreen'>
      <AppHeader
        onCreateItem={onCreateItem}
        onResetItems={onResetItems}
      />

      <div className='container mb-5'>
        <h2>For Sale</h2>
        <hr />
        <SaleItemList
          items={saleInventory}
          onChangeItem={onChangeItem}
        />
      </div>

      <div className='container'>
        <h2>Sold</h2>
        <hr />
        <SoldItemList
          items={soldInventory}
        />
      </div>
    </div>
  )
}

AppScreen.defaultProps = {
  onCreateItem: () => {},
  onChangeItem: () => {},
  onResetItems: () => {}
}

AppScreen.propTypes = {
  saleInventory: PropTypes.array.isRequired,
  soldInventory: PropTypes.array.isRequired,
  onCreateItem: PropTypes.func,
  onChangeItem: PropTypes.func,
  onResetItems: PropTypes.func
}

export default AppScreen
