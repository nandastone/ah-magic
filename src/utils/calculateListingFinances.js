import calculateListingCost from './calculateListingCost'
import calculateListingPrice from './calculateListingPrice'

/**
 * Calculate a listing's finances (cost, price, profit) based on its history.
 * @param {Array} history collection of history objects containing cost and price properties
 */
const calculateListingFinances = (history = []) => {
  const cost = calculateListingCost(history)
  const price = calculateListingPrice(history)
  return { cost, price, profit: price - cost }
}


export default calculateListingFinances
