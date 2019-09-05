import { ItemHistoryType, ItemHistory } from './ItemHistory'

export interface PurchaseItemHistory extends ItemHistory {
  type: ItemHistoryType.Purchase

  /**
   * How much it cost to obtain this item.
   */
  cost: number
}
