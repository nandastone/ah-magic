import React from 'react'

import { SALE, SOLD } from '../fixtures'
import { Item } from '../types/Item'
import { SaleMethod } from '../types/SaleMethod'
import { sellItem } from '../services/InventoryService'

interface InventoryProviderState {
  sale: Item[]
  sold: Item[]
  version?: number
  sellItem: (item: Item, amount: number, method: SaleMethod) => void
}

const initialState: InventoryProviderState = {
  sale: [],
  sold: [],
  version: 0.1,
  sellItem: () => {},
}

export const InventoryContext = React.createContext<InventoryProviderState>(
  initialState
)

export class InventoryProvider extends React.Component<
  {},
  InventoryProviderState
> {
  state = {
    ...initialState,
    sellItem: this.sellItem,
  }

  componentDidMount() {
    const storedState = window.localStorage.getItem('ah-magic-state')

    if (storedState) {
      this.setState(JSON.parse(storedState))
    } else {
      this.setState({
        sale: SALE,
        sold: SOLD,
      })
    }
  }

  sellItem(item: Item, amount: number, method: SaleMethod) {
    const soldItem = sellItem(item, amount, method)

    console.log({ soldItem })
    // @todo save updated item
    // this.props.onChangeItem(updatedItem)
  }

  render() {
    return (
      <InventoryContext.Provider value={this.state}>
        {/* <Provider
        value={{
          ...this.state,
          sellItem: this.sellItem,
        }}
      > */}
        {this.props.children}
      </InventoryContext.Provider>
    )
  }
}

export const InventoryConsumer = InventoryContext.Consumer
