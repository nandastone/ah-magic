import React, { Component } from 'react'

import { SALE, SOLD } from '../fixtures/'

const InventoryContext = React.createContext([])
const { Consumer, Provider } = InventoryContext

export default class InventoryProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sale: [],
      sold: [],
      version: 0.1,
    }
  }

  componentDidMount() {
    const storedState = window.localStorage.getItem('ah-magic-state')

    if (storedState) {
      this.setState(...JSON.parse(storedState))
    } else {
      this.setState({
        sale: SALE,
        sold: SOLD,
      })
    }
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export { InventoryProvider, Consumer as InventoryConsumer, InventoryContext }
