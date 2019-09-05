import { ListingItemHistory } from './ListingItemHistory'
import { SaleItemHistory } from './SaleItemHistory'
import { PurchaseItemHistory } from './PurchaseItemHistory'

export interface Item {
  id: string

  name: string

  /**
   * The ID of the source item in WOWDB.
   */
  sourceId: number

  /**
   * A record of the item's purchase, attempts to sell, and eventual sale. The
   * history can be used as a log, or to replay for profit/loss amounts.
   */
  history: (PurchaseItemHistory | ListingItemHistory | SaleItemHistory)[]

  /**
   * Currency amount this item can be vendored for. This value is sourced from WOWDB
   * and is static.
   */
  vendorValue: number

  /**
   * Indicates this item can be stacked up to this number.
   */
  stackable?: number
}
