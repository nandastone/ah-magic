import { ItemHistoryEntry, ItemHistoryEntryType } from './ItemHistory'
import { SaleMethod } from './SaleMethod'

export interface SaleItemHistoryEntry extends ItemHistoryEntry {
  type: ItemHistoryEntryType.Sale

  /**
   * How the item was sold.
   */
  saleMethod: SaleMethod

  /**
   * The amount the item was sold for.
   */
  amount: number
}
