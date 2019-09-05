import { ItemHistoryEntryType, ItemHistoryEntry } from './ItemHistory'

export interface PurchaseItemHistoryEntry extends ItemHistoryEntry {
  type: ItemHistoryEntryType.Purchase

  /**
   * How much it cost to obtain this item.
   */
  cost: number
}
