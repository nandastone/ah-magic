/**
 * Calculate a listing's total cost based on its history.
 * @param {Array} history collection of history objects containing a cost property
 */
const calculateListingCost = (history = []) => {
  return history.reduce((cost, item) => {
    return cost + (item.cost || 0)
  }, 0)
}

export default calculateListingCost
