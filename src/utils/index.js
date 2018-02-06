import _ from 'lodash'

export const calculateAHListingCost = (value, duration = 48) => {
  let percent = 0
  switch (duration) {
    case 12:
      percent = 0.15
      break;
    case 24:
      percent = 0.3
      break;
    case 48:
      percent = 0.6
      break;
    default:
      throw new Error(`Invalid Auction House duration: ${duration}`)
  }
  return value * percent
}

export const calculateAHTransactionCost = (value) => {
  return value * 0.05
}

export const calculateCost = (history) => {
  return history.reduce((cost, item) => {
    return cost + (item.cost || 0)
  }, 0)
}

export const calculatePrice = (history) => {
  const lastHistory = _.last(history)
  return (_.get(lastHistory, 'type') !== 'purchase') ? lastHistory.price : 0
}

export const calculateItemFinances = (history) => {
  const cost = calculateCost(history)
  const price = calculatePrice(history)
  return { cost, price, profit: price - cost }
}

export const convertWowCurrency = (value = 0) => {
  let amount = value

  if (value < 0) {
    amount = Math.abs(value)
  }

  const copper = Math.floor(amount % 100)
  amount = (amount - copper) / 100
  const silver = Math.floor(amount % 100)
  const gold = Math.floor((amount - silver) / 100)

  return { gold, silver, copper}
}
