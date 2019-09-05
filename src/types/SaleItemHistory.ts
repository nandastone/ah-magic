import { ItemHistory, ItemHistoryType } from './ItemHistory'
import { SaleMethod } from './SaleMethod'

export interface SaleItemHistory extends ItemHistory {
  type: ItemHistoryType.Sale

  /**
   * How the item was sold.
   */
  method: SaleMethod

  /**
   * The amount the item was sold for.
   */
  amount: number
}
