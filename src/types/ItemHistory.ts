export interface ItemHistory {
  id: string
  type: ItemHistoryType
  createdOn: string
  updatedOn: string
}

export enum ItemHistoryType {
  /**
   * When the item is purchased to enter the player's inventory.
   */
  Purchase,

  /**
   * When the item is listed for sale on the AH.
   */
  Listing,

  /**
   * When the item is sold, either on the AH, directly, or vendored.
   */
  Sale,
}
