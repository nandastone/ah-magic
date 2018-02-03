import _ from 'lodash'

export const calculateAHListingCost = (value) => {
  return value * 0.1
}

export const calculateAHTransactionCost = (value) => {
  return value * 0.1
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

export const calculateSalesInfo = (history) => {
  const cost = calculateCost(history)
  const price = calculatePrice(history)
  return { cost, price, profit: price - cost }
}

export const formatWowCurrency = (value = 0) => {
  let prefix = ''
  let amount = value

  if (value < 0) {
    prefix = '-'
    amount = Math.abs(value)
  }

  const copper = amount % 100
  amount = (amount - copper) / 100
  const silver = amount % 100
  const gold = (amount - silver) / 100

  return `${prefix}${gold}g${silver}s${copper}c`
}
