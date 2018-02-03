import React, { Component } from 'react'
import _ from 'lodash'

import './App.css'

// Todo

// @todo Calculate and add cost to listing and sale history items when creating them.

// Components

import SaleItemList from './components/SaleItemList'
import SoldItemList from './components/SoldItemList'

class App extends Component {
  state = {
    entities: {
      items: {}
    },
    inventory: [
      {
        key: '1',
        name: 'Bright Cloak',
        history: [
          { key: '1', type: 'purchase', cost: 19550 },
          { key: '2', type: 'listing', price: 129500, cost: 5000 },
          { key: '3', type: 'sale', price: 99550, cost: 2500 }
        ],
        vendorValue: 50
      },
      {
        key: '2',
        name: 'Hobnob Badge',
        history: [
          { key: '1', type: 'purchase', cost: 50000 },
          { key: '2', type: 'listing', price: 200000, cost: 5000 },
          { key: '3', type: 'listing', price: 150000, cost: 5000 }
        ],
        vendorValue: 25
      },
      {
        key: '3',
        name: 'Darkwater Breastplate',
        history: [
          { key: '1', type: 'purchase', cost: 99900 }
        ],
        vendorValue: 60
      },
      {
        key: '4',
        name: 'Icy Wand',
        history: [
          { key: '1', type: 'purchase', cost: 145000 },
          { key: '2', type: 'listing', price: 200000, cost: 5000 },
        ],
        vendorValue: 80
      },
      {
        key: '5',
        name: 'Mageweave Cloak',
        history: [
          { key: '1', type: 'purchase', cost: 145000 },
          { key: '2', type: 'listing', price: 200000, cost: 500 },
          { key: '3', type: 'listing', price: 190000, cost: 500 },
          { key: '4', type: 'sale', price: 180000, cost: 250 }
        ],
        vendorValue: 75
      },
      {
        key: '6',
        name: 'Cursed Axe',
        history: [
          { key: '1', type: 'purchase', cost: 145000 },
          { key: '2', type: 'sale', price: 50000, isVendored: true }
        ],
        vendorValue: 75
      }
    ]
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
