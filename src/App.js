import React, { Component } from 'react'
import _ from 'lodash'

import { inventory } from './fixtures'

// Components

import SaleItemList from './components/SaleItemList'
import SoldItemList from './components/SoldItemList'

// Assets

import './App.css'

class App extends Component {
  state = {
    inventory: inventory
  }

  // Event handling

  handleChangeItem = (item) => {
    const existingItemIndex = _.findIndex(this.state.inventory, { key: item.key })

    if (existingItemIndex < 0) {
      throw new Error('Unable to find item in state to update:', item)
    }

    const newInventory = [ ...this.state.inventory ]
    newInventory[existingItemIndex] = { ...item }

    this.setState({ inventory: newInventory })
  }

  // Rendering

  render () {
    const saleInventory = this.state.inventory.filter(item => {
      const lastHistory = _.last(item.history)
      return lastHistory.type !== 'sale'
    })
    const soldInventory = this.state.inventory.filter(item => {
      const lastHistory = _.last(item.history)
      return lastHistory.type === 'sale'
    })

    return (
      <div className='App'>
        <div className='container mb-5'>
          <h2>For Sale</h2>
          <hr />
          <SaleItemList items={saleInventory} onChangeItem={this.handleChangeItem} />
        </div>

        <div className='container'>
          <h2>Sold</h2>
          <hr />
          <SoldItemList items={soldInventory} />
        </div>
      </div>
    )
  }
}

export default App
