import moment from 'moment'

export const inventory = [
  {
    key: '1',
    name: 'Bright Cloak',
    history: [
      { key: '1', type: 'purchase', cost: 19550 },
      { key: '2', type: 'listing', price: 129500, cost: 5000 },
      { key: '3', type: 'sale', price: 99550, cost: 2500 }
    ],
    vendorValue: 50
  },
  {
    key: '2',
    name: 'Hobnob Badge',
    history: [
      {
        key: '1',
        type: 'purchase',
        cost: 50000,
        createdAt: moment().format()
      },
      {
        key: '2',
        type: 'listing',
        price: 200000,
        cost: 5000,
        createdAt: moment().format(),
        endedAt: moment().add(1, 'day').format()
      },
      {
        key: '3',
        type: 'listing',
        price: 150000,
        cost: 5000,
        createdAt: moment().format()
      }
    ],
    vendorValue: 25
  },
  {
    key: '3',
    name: 'Darkwater Breastplate',
    history: [
      { key: '1', type: 'purchase', cost: 99900 }
    ],
    vendorValue: 60
  },
  {
    key: '4',
    name: 'Icy Wand',
    history: [
      { key: '1', type: 'purchase', cost: 145000 },
      { key: '2', type: 'listing', price: 200000, cost: 5000 }
    ],
    vendorValue: 80
  },
  {
    key: '5',
    name: 'Fiery War Axe',
    history: [
      { key: '1', type: 'purchase', cost: 900000 },
      {
        key: '2',
        type: 'listing',
        price: 1500000,
        cost: 20000,
        createdAt: moment().format(),
        endedAt: moment().add(1, 'day').format()
      }
    ],
    vendorValue: 80
  },
  {
    key: '6',
    name: 'Mageweave Cloak',
    history: [
      { key: '1', type: 'purchase', cost: 145000 },
      { key: '2', type: 'listing', price: 200000, cost: 500 },
      { key: '3', type: 'listing', price: 190000, cost: 500 },
      { key: '4', type: 'sale', price: 180000, cost: 250 }
    ],
    vendorValue: 75
  },
  {
    key: '7',
    name: 'Cursed Axe',
    history: [
      { key: '1', type: 'purchase', cost: 145000 },
      { key: '2', type: 'sale', price: 50000, isVendored: true }
    ],
    vendorValue: 75
  }
]
