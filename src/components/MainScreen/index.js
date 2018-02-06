import React from 'react'
import PropTypes from 'prop-types'

// Components

import SaleItemList from '../SaleItemList'
import SoldItemList from '../SoldItemList'

const MainScreen = ({ saleInventory, soldInventory, onChangeItem, onResetItems }) => {
  return (
    <div className='c-MainScreen'>
      <div className='jumbotron'>
        <div className='container'>
          <h1>Auction House Magic</h1>
          <p>
            <button
              className='btn btn-primary'
              onClick={() => {
                if (window.confirm('Are you sure want to reset item data?')) onResetItems()
              }
            }>
              Reset
            </button>
          </p>
        </div>
      </div>

      <div className='container mb-5'>
        <h2>For Sale</h2>
        <hr />
        <SaleItemList items={saleInventory} onChangeItem={onChangeItem} />
      </div>

      <div className='container'>
        <h2>Sold</h2>
        <hr />
        <SoldItemList items={soldInventory} />
      </div>
    </div>
  )
}

MainScreen.defaultProps = {
  onChangeItem: () => {},
  onResetItems: () => {}
}

MainScreen.propTypes = {
  saleInventory: PropTypes.array.isRequired,
  soldInventory: PropTypes.array.isRequired,
  onChangeItem: PropTypes.func.isRequired,
  onResetItems: PropTypes.func.isRequired
}

export default MainScreen
