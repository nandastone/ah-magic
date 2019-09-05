import React from 'react'

import { PurchaseItemHistoryEntry } from '../../types/PurchaseItemHistory'
import { ListingItemHistoryEntry } from '../../types/ListingItemHistory'
import { SaleItemHistoryEntry } from '../../types/SaleItemHistory'

// Components

import Row from './Row'

interface ItemHistoryProps {
  // @todo Should this be a generic?
  history: (
    | PurchaseItemHistoryEntry
    | ListingItemHistoryEntry
    | SaleItemHistoryEntry)[]
}

const ItemHistory = ({ history }: ItemHistoryProps) => {
  if (!history.length) {
    return null
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Type</th>
          <th scope="col">Cost</th>
          <th scope="col">Price</th>
          <th scope="col">Duration</th>
          <th scope="col">Created</th>
          <th scope="col">Ended</th>
        </tr>
      </thead>
      <tbody>
        {history.map(itemHistoryEntry => (
          <Row key={itemHistoryEntry.id} itemHistoryEntry={itemHistoryEntry} />
        ))}
      </tbody>
    </table>
  )
}

export default ItemHistory
