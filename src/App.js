import React, { Component } from 'react'
import _ from 'lodash'

import './App.css'

// Components

import ItemList from './components/ItemList'

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
          { key: '1', type: 'purchase', cost: 195.50 },
          { key: '2', type: 'listing', price: 1295, cost: 50 },
          { key: '3', type: 'sale', price: 995.50 }
        ],
        vendorValue: 50
      },
      {
        key: '2',
        name: 'Hobnob Badge',
        history: [
          { key: '1', type: 'purchase', cost: 500 },
          { key: '2', type: 'listing', price: 20000, cost: 50 },
          { key: '3', type: 'listing', price: 15000, cost: 50 }
        ],
        vendorValue: 25
      },
      {
        key: '3',
        name: 'Darkwater Breastplate',
        history: [
          { key: '1', type: 'purchase', cost: 999 }
        ],
        vendorValue: 25
      },
      {
        key: '4',
        name: 'Icy Wand',
        history: [
          { key: '1', type: 'purchase', cost: 14500 },
          { key: '2', type: 'listing', price: 20000, cost: 50 },
        ],
        vendorValue: 25
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
    // const soldInventory = this.state.inventory.filter(item => {
    //   return _.find(item.history, { type: 'sale' })
    // })

    return (
      <div className='App'>
        <h2>Sale</h2>
        <ItemList items={saleInventory} onChangeItem={this.handleChangeItem} />

        {/* <h2>Sold</h2>
        <ItemList items={soldInventory} /> */}
      </div>
    )
  }
}

export default App
