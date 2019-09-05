import moment from 'moment'
import * as uuid from 'uuid'

import { Item } from '../types/Item'
import { ItemHistoryType } from '../types/ItemHistory'
import { ListingDuration } from '../types/ListingDuration'
import { SaleMethod } from '../types/SaleMethod'

// @todo History is not being type checked correctly.

export const SALE: Item[] = [
  {
    id: uuid.v4(),
    name: 'Sword of Zeal',
    sourceId: 63525681,
    history: [
      {
        id: uuid.v4(),
        type: ItemHistoryType.Purchase,
        cost: 19550,
        createdOn: moment()
          .subtract(22, 'day')
          .format(),
        updatedOn: moment()
          .subtract(22, 'day')
          .format(),
      },
      {
        id: uuid.v4(),
        type: ItemHistoryType.Listing,
        duration: ListingDuration.Long,
        bid: 100000,
        buyout: 129500,
        createdOn: moment().format(),
        updatedOn: moment().format(),
        endedOn: moment()
          .add(1, 'day')
          .format(),
      },
      {
        id: uuid.v4(),
        type: ItemHistoryType.Listing,
        duration: ListingDuration.Long,
        bid: 100000,
        buyout: 119500,
        createdOn: moment().format(),
        updatedOn: moment().format(),
      },
    ],
    vendorValue: 5000,
  },
  {
    id: uuid.v4(),
    name: 'Stromgarde Badge',
    sourceId: 63513411,
    history: [
      {
        id: uuid.v4(),
        type: ItemHistoryType.Purchase,
        cost: 50000,
        createdOn: moment()
          .subtract(1, 'day')
          .format(),
        updatedOn: moment()
          .subtract(1, 'day')
          .format(),
      },
      {
        id: uuid.v4(),
        type: ItemHistoryType.Listing,
        duration: ListingDuration.Medium,
        bid: 200000,
        buyout: 200000,
        createdOn: moment().format(),
        updatedOn: moment().format(),
        endedOn: moment()
          .add(1, 'day')
          .format(),
      },
      {
        id: uuid.v4(),
        type: ItemHistoryType.Listing,
        duration: ListingDuration.Long,
        bid: 110000,
        buyout: 150000,
        createdOn: moment().format(),
        updatedOn: moment().format(),
      },
    ],
    vendorValue: 2500,
  },
  {
    id: uuid.v4(),
    name: 'Darkrune Helm',
    sourceId: 63578031,
    history: [
      {
        id: uuid.v4(),
        type: ItemHistoryType.Purchase,
        cost: 99900,
        createdOn: moment()
          .subtract(32, 'day')
          .format(),
        updatedOn: moment()
          .subtract(32, 'day')
          .format(),
      },
    ],
    vendorValue: 60,
  },
  {
    id: uuid.v4(),
    name: 'Ember Wand',
    sourceId: 63517881,
    history: [
      {
        id: uuid.v4(),
        type: ItemHistoryType.Purchase,
        cost: 145000,
        createdOn: moment()
          .subtract(14, 'day')
          .format(),
        updatedOn: moment()
          .subtract(14, 'day')
          .format(),
      },
      {
        id: uuid.v4(),
        type: ItemHistoryType.Listing,
        duration: ListingDuration.Long,
        bid: 1600000,
        buyout: 200000,
        createdOn: moment().format(),
        updatedOn: moment().format(),
      },
    ],
    vendorValue: 8000,
  },
  {
    id: uuid.v4(),
    name: 'Fiery War Axe',
    sourceId: 63492601,
    history: [
      {
        id: uuid.v4(),
        type: ItemHistoryType.Purchase,
        cost: 900000,
        createdOn: moment()
          .subtract(17, 'day')
          .format(),
        updatedOn: moment()
          .subtract(17, 'day')
          .format(),
      },
      {
        id: uuid.v4(),
        type: ItemHistoryType.Listing,
        duration: ListingDuration.Long,
        bid: 1250000,
        buyout: 1500000,
        createdOn: moment().format(),
        updatedOn: moment().format(),
        endedOn: moment()
          .add(1, 'day')
          .format(),
      },
    ],
    vendorValue: 8000,
  },
  {
    id: uuid.v4(),
    name: 'Silk Cloth',
    sourceId: 63511581,
    stackable: 20,
    history: [
      {
        id: uuid.v4(),
        type: ItemHistoryType.Purchase,
        cost: 2000,
        createdOn: moment().format(),
        updatedOn: moment().format(),
      },
    ],
    vendorValue: 2000,
  },
]

export const SOLD: Item[] = [
  {
    id: uuid.v4(),
    name: 'Brightcloth Cloak',
    sourceId: 63544821,
    history: [
      {
        id: uuid.v4(),
        type: ItemHistoryType.Purchase,
        cost: 19550,
        createdOn: moment()
          .subtract(3, 'day')
          .format(),
        updatedOn: moment()
          .subtract(3, 'day')
          .format(),
      },
      {
        id: uuid.v4(),
        type: ItemHistoryType.Listing,
        duration: ListingDuration.Short,
        bid: 100000,
        buyout: 129500,
        createdOn: moment().format(),
        updatedOn: moment().format(),
        endedOn: moment()
          .add(1, 'day')
          .format(),
      },
      {
        id: uuid.v4(),
        type: ItemHistoryType.Listing,
        duration: ListingDuration.Long,
        bid: 100000,
        buyout: 119500,
        createdOn: moment().format(),
        updatedOn: moment().format(),
        endedOn: moment()
          .add(1, 'day')
          .format(),
      },
      {
        id: uuid.v4(),
        type: ItemHistoryType.Sale,
        method: SaleMethod.AuctionHouse,
        amount: 119500,
        createdOn: moment()
          .add(1, 'day')
          .format(),
        updatedOn: moment()
          .add(1, 'day')
          .format(),
      },
    ],
    vendorValue: 5000,
  },
  {
    id: uuid.v4(),
    name: 'Pink Mageweave Shirt',
    sourceId: 63539821,
    history: [
      {
        id: uuid.v4(),
        type: ItemHistoryType.Purchase,
        cost: 145000,
        createdOn: moment()
          .subtract(3, 'day')
          .format(),
        updatedOn: moment()
          .subtract(3, 'day')
          .format(),
      },
      {
        id: uuid.v4(),
        type: ItemHistoryType.Listing,
        duration: ListingDuration.Long,
        bid: 200000,
        buyout: 200000,
        createdOn: moment().format(),
        updatedOn: moment().format(),
        endedOn: moment()
          .add(1, 'day')
          .format(),
      },
      {
        id: uuid.v4(),
        type: ItemHistoryType.Listing,
        duration: ListingDuration.Long,
        bid: 190000,
        buyout: 190000,
        createdOn: moment().format(),
        updatedOn: moment().format(),
        endedOn: moment()
          .add(1, 'day')
          .format(),
      },
      {
        id: uuid.v4(),
        type: ItemHistoryType.Sale,
        method: SaleMethod.Private,
        amount: 180000,
        createdOn: moment()
          .add(1, 'day')
          .format(),
        updatedOn: moment()
          .add(1, 'day')
          .format(),
      },
    ],
    vendorValue: 75,
  },
  {
    id: uuid.v4(),
    name: 'Devilsaur Gauntlets',
    sourceId: 63562171,
    history: [
      {
        id: uuid.v4(),
        type: ItemHistoryType.Purchase,
        cost: 145000,
        createdOn: moment()
          .subtract(21, 'day')
          .format(),
        updatedOn: moment()
          .subtract(21, 'day')
          .format(),
      },
      {
        id: uuid.v4(),
        type: ItemHistoryType.Sale,
        amount: 50000,
        method: SaleMethod.Vendor,
        createdOn: moment()
          .add(1, 'day')
          .format(),
        updatedOn: moment()
          .add(1, 'day')
          .format(),
      },
    ],
    vendorValue: 7500,
  },
]
