import calculateListingCost from './calculateListingCost'
import calculateListingPrice from './calculateListingPrice'

/**
 * Calculate a listing's finances (cost, price, profit) based on its history.
 * @param {Array} history collection of history objects containing cost and price properties
 */
const calculateListingFinances = (history = []) => {
  const cost = calculateListingCost(history)
  const price = calculateListingPrice(history)
  let profit = 0
  if (!cost) {
    profit = price
  } else if (!price) {
    profit = 0
  } else {
    profit = price - cost
  }
  return { cost, price, profit }
}


export default calculateListingFinances
