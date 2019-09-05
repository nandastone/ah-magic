export interface ItemHistoryEntry {
  id: string
  type: ItemHistoryEntryType
  createdOn: string
  updatedOn: string
}

export enum ItemHistoryEntryType {
  /**
   * When the item is purchased to enter the player's inventory.
   */
  Purchase = 'purchase',

  /**
   * When the item is listed for sale on the AH.
   */
  Listing = 'listing',

  /**
   * When the item is sold, either on the AH, directly, or vendored.
   */
  Sale = ' sale',
}
