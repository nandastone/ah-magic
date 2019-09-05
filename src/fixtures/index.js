import moment from 'moment'
import uuid from 'uuid/v4'

export const SALE = [
  {
    key: uuid(),
    name: 'Incandescent Cloak',
    history: [
      {
        key: uuid(),
        type: 'purchase',
        cost: 19550,
        createdAt: moment()
          .subtract(22, 'day')
          .format(),
      },
      {
        key: uuid(),
        type: 'listing',
        duration: 24,
        bid: 100000,
        price: 129500,
        cost: 3000,
        createdAt: moment().format(),
        endedAt: moment()
          .add(1, 'day')
          .format(),
      },
      {
        key: uuid(),
        type: 'listing',
        duration: 24,
        bid: 100000,
        price: 119500,
        cost: 3000,
        createdAt: moment().format(),
      },
    ],
    vendorValue: 5000,
  },
  {
    key: uuid(),
    name: 'Hobnob Badge',
    history: [
      {
        key: uuid(),
        type: 'purchase',
        cost: 50000,
        createdAt: moment()
          .subtract(1, 'day')
          .format(),
      },
      {
        key: uuid(),
        type: 'listing',
        bid: 200000,
        price: 200000,
        cost: 5000,
        createdAt: moment().format(),
        endedAt: moment()
          .add(1, 'day')
          .format(),
      },
      {
        key: uuid(),
        type: 'listing',
        bid: 110000,
        price: 150000,
        cost: 5000,
        createdAt: moment().format(),
      },
    ],
    vendorValue: 2500,
  },
  {
    key: uuid(),
    name: 'Darkwater Breastplate',
    history: [
      {
        key: uuid(),
        type: 'purchase',
        cost: 99900,
        createdAt: moment()
          .subtract(32, 'day')
          .format(),
      },
    ],
    vendorValue: 60,
  },
  {
    key: uuid(),
    name: 'Icy Wand',
    history: [
      {
        key: uuid(),
        type: 'purchase',
        cost: 145000,
        createdAt: moment()
          .subtract(14, 'day')
          .format(),
      },
      {
        key: uuid(),
        type: 'listing',
        bid: 1600000,
        price: 200000,
        cost: 5000,
        createdAt: moment().format(),
      },
    ],
    vendorValue: 8000,
  },
  {
    key: uuid(),
    name: 'Fiery War Axe',
    history: [
      {
        key: uuid(),
        type: 'purchase',
        cost: 900000,
        createdAt: moment()
          .subtract(17, 'day')
          .format(),
      },
      {
        key: uuid(),
        type: 'listing',
        bid: 1250000,
        price: 1500000,
        cost: 20000,
        createdAt: moment().format(),
        endedAt: moment()
          .add(1, 'day')
          .format(),
      },
    ],
    vendorValue: 8000,
  },
  {
    key: uuid(),
    name: 'Silk Cloth',
    stackable: 20,
    history: [
      {
        key: uuid(),
        type: 'purchase',
        cost: 2000,
        createdAt: moment().format(),
      },
    ],
    vendorValue: 2000,
  },
]

export const SOLD = [
  {
    key: uuid(),
    name: 'Bright Cloak',
    history: [
      {
        key: uuid(),
        type: 'purchase',
        cost: 19550,
        createdAt: moment()
          .subtract(3, 'day')
          .format(),
      },
      {
        key: uuid(),
        type: 'listing',
        bid: 100000,
        price: 129500,
        cost: 5000,
        createdAt: moment().format(),
        endedAt: moment()
          .add(1, 'day')
          .format(),
      },
      {
        key: uuid(),
        type: 'listing',
        bid: 100000,
        price: 119500,
        cost: 0,
        createdAt: moment().format(),
        endedAt: moment()
          .add(1, 'day')
          .format(),
      },
      {
        key: uuid(),
        type: 'sale',
        price: 119500,
        cost: 2500,
        createdAt: moment()
          .add(1, 'day')
          .format(),
      },
    ],
    vendorValue: 5000,
  },
  {
    key: '7',
    name: 'Mageweave Cloak',
    history: [
      {
        key: uuid(),
        type: 'purchase',
        cost: 145000,
        createdAt: moment()
          .subtract(3, 'day')
          .format(),
      },
      {
        key: uuid(),
        type: 'listing',
        bid: 200000,
        price: 200000,
        cost: 500,
        createdAt: moment().format(),
        endedAt: moment()
          .add(1, 'day')
          .format(),
      },
      {
        key: uuid(),
        type: 'listing',
        bid: 190000,
        price: 190000,
        cost: 500,
        createdAt: moment().format(),
        endedAt: moment()
          .add(1, 'day')
          .format(),
      },
      {
        key: uuid(),
        type: 'sale',
        price: 180000,
        cost: 250,
        createdAt: moment()
          .add(1, 'day')
          .format(),
      },
    ],
    vendorValue: 75,
  },
  {
    key: '8',
    name: 'Cursed Axe',
    history: [
      {
        key: uuid(),
        type: 'purchase',
        cost: 145000,
        createdAt: moment()
          .subtract(21, 'day')
          .format(),
      },
      {
        key: uuid(),
        type: 'sale',
        price: 50000,
        cost: 0,
        saleType: 'vendor',
        createdAt: moment()
          .add(1, 'day')
          .format(),
      },
    ],
    vendorValue: 7500,
  },
]
