import React from 'react'
import _ from 'lodash'
import moment from 'moment'

import { SaleItemHistoryEntry } from '../../../types/SaleItemHistory'
import { PurchaseItemHistoryEntry } from '../../../types/PurchaseItemHistory'
import { ListingItemHistoryEntry } from '../../../types/ListingItemHistory'
import { ItemHistoryEntryType } from '../../../types/ItemHistory'
import {
  prettySaleMethod,
  prettyItemHistoryEntryType,
} from '../../../services/InventoryService'

// Components

import WowCurrency from '../../WowCurrency'

interface RowProps {
  itemHistoryEntry:
    | PurchaseItemHistoryEntry
    | ListingItemHistoryEntry
    | SaleItemHistoryEntry
}

const Row = ({ itemHistoryEntry }: RowProps) => {
  return (
    <tr>
      <td className="type">
        {prettyItemHistoryEntryType(itemHistoryEntry.type)}
        {itemHistoryEntry.type === ItemHistoryEntryType.Sale && (
          <span> ({prettySaleMethod(itemHistoryEntry.saleMethod)})</span>
        )}
      </td>
      <td className="cost">
        {itemHistoryEntry.type === ItemHistoryEntryType.Purchase && (
          <WowCurrency value={itemHistoryEntry.cost} />
        )}
      </td>
      <td className="price">
        {itemHistoryEntry.type === ItemHistoryEntryType.Listing && (
          <>
            {itemHistoryEntry.bid && (
              <div>
                Bid: <WowCurrency value={itemHistoryEntry.bid} />
              </div>
            )}

            {itemHistoryEntry.buyout && (
              <div>
                Price: <WowCurrency value={itemHistoryEntry.buyout} />
              </div>
            )}
          </>
        )}
      </td>
      <td className="duration">
        {itemHistoryEntry.type === ItemHistoryEntryType.Listing && (
          <>{itemHistoryEntry.duration}h</>
        )}
      </td>
      <td className="created">
        {itemHistoryEntry.createdOn && (
          <>
            {moment(itemHistoryEntry.createdOn).format('D MMM YYYY, h:mm:ss a')}
          </>
        )}
      </td>
      <td className="ended">
        {itemHistoryEntry.type === ItemHistoryEntryType.Listing && (
          <>
            {itemHistoryEntry.endedOn && (
              <div>
                {moment(itemHistoryEntry.endedOn).format(
                  'D MMM YYYY, h:mm:ss a'
                )}
              </div>
            )}
          </>
        )}
      </td>
    </tr>
  )
}

export default Row
