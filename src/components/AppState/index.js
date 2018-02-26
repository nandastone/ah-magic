import React, { PureComponent } from 'react'
import _ from 'lodash'
import moment from 'moment'

import { inventory as INVENTORY_FIXTURES } from '../../fixtures/'

// Components

import AppScreen from '../AppScreen'

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

  handleCreateItem = (item) => {
    const newInventory = [
      ...this.state.inventory,
      item
    ]

    this.setState({ inventory: newInventory })
  }

  handleChangeItem = (item) => {
    const existingItemIndex = _.findIndex(this.state.inventory, { key: item.key })

    if (existingItemIndex < 0) {
      throw new Error('Unable to find item in state to update:', item)
    }

    const newInventory = [ ...this.state.inventory ]
    newInventory[existingItemIndex] = { ...item }

    this.setState({ inventory: newInventory })
  }

  handleDeleteItem = (item) => {
    const newInventory = this.state.inventory.filter(existingItem => !_.isEqual(item, existingItem))

    this.setState({ inventory: newInventory })
  }

  handleResetItems = () => {
    this.setState({ inventory: [] })
  }

  // Rendering

  render () {
    const saleInventory = _.sortBy(this.state.inventory.filter(item => {
      const lastHistory = _.last(item.history)
      return lastHistory.type !== 'sale'
    }), (item) => {
      const lastHistory = _.last(item.history)
      return moment(lastHistory.createdAt).format('X')
    }).reverse()
    const soldInventory = _.sortBy(this.state.inventory.filter(item => {
      const lastHistory = _.last(item.history)
      return lastHistory.type === 'sale'
    }), (item) => {
      const lastHistory = _.last(item.history)
      return moment(lastHistory.endedAt).format('X')
    }).reverse()

    return (
      <div className='c-AppState'>
        <AppScreen
          saleInventory={saleInventory}
          soldInventory={soldInventory}
          onCreateItem={this.handleCreateItem}
          onChangeItem={this.handleChangeItem}
          onDeleteItem={this.handleDeleteItem}
          onResetItems={this.handleResetItems}
        />
      </div>
    )
  }
}

export default AppState
