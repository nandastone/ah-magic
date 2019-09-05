import dayjs from 'dayjs'
import * as uuid from 'uuid'

import { ItemHistoryType } from '../types/ItemHistory'
import { SaleItemHistory } from '../types/SaleItemHistory'
import { Item } from '../types/Item'
import { SaleMethod } from '../types/SaleMethod'

// export class InventoryService {

// }

export const sellItem = (item: Item, amount: number, method: SaleMethod) => {
  // const lastHistory: ItemHistory = _.last(item.history)

  let updatedItem = { ...item }

  // // If the item is listed, remove the "listing" history entry to later replace with a "sale" history entry.
  // if (lastHistory && lastHistory.type === ItemHistoryType.Listing) {
  //   updatedItem = {
  //     ...updatedItem,
  //     history: [
  //       ..._.dropRight(item.history),
  //       {
  //         ...lastHistory,
  //         // If we sold via the AH, negate the previous listing fee.
  //         cost: method === SaleMethod.AuctionHouse ? 0 : lastHistory.cost,
  //         // Save the listing end date.
  //         endedOn: lastHistory.endedOn || dayjs().format(),
  //       },
  //     ],
  //   }
  // }

  // Create a "sale" history entry.
  const saleHistory: SaleItemHistory = {
    id: uuid.v4(),
    type: ItemHistoryType.Sale,
    method,
    amount,
    // Only add transaction fees if the item was sold on the AH.
    // @todo Do we calculate here or do it on the fly?
    // cost: saleType === 'ah' ? calculateAHTransactionCost(price) : 0,
    createdOn: dayjs().format(),
    updatedOn: dayjs().format(),
  }

  updatedItem = {
    ...updatedItem,
    history: [...updatedItem.history, saleHistory],
  }

  return updatedItem
}
