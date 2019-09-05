import { ItemHistoryType, ItemHistory } from './ItemHistory'
import { ListingDuration } from './ListingDuration'

export interface ListingItemHistory extends ItemHistory {
  type: ItemHistoryType.Listing

  /**
   * AH listing duration.
   */
  duration: ListingDuration

  /**
   * AH listing bid amount.
   */
  bid: number

  /**
   * AH listing buyout amount.
   */
  buyout: number

  /**
   * When the listing ended. This could track expiry or a sale.
   */
  endedOn?: string
}
