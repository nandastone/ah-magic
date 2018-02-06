import React, { PureComponent } from 'react'
import _ from 'lodash'

import { inventory as INVENTORY_FIXTURES } from '../../fixtures'

// Components

import MainScreen from '../MainScreen'

class AppState extends PureComponent {
  constructor (props) {
    super(props)

    const storedState = window.localStorage.getItem('ah-magic-state')
    if (storedState) {
      this.state = { ...JSON.parse(storedState) }
    } else {
      this.state = {
        inventory: [ ...INVENTORY_FIXTURES ]
      }
    }
  }

  // Lifecycle

  componentWillUpdate (nextProps, nextState) {
    window.localStorage.setItem('ah-magic-state', JSON.stringify(nextState))
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

  handleResetItems = () => {
    this.setState({ inventory: [] })
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
      <div className='c-AppState'>
        <MainScreen
          saleInventory={saleInventory}
          soldInventory={soldInventory}
          onChangeItem={this.handleChangeItem}
          onResetItems={this.handleResetItems}
        />
      </div>
    )
  }
}

export default AppState
