import { ItemHistoryEntryType, ItemHistoryEntry } from './ItemHistory'
import { ListingDuration } from './ListingDuration'

export interface ListingItemHistoryEntry extends ItemHistoryEntry {
  type: ItemHistoryEntryType.Listing

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
