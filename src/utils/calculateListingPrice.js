import _ from 'lodash'

/**
 * Calculate a listings sale price based on its history.
 * @param {Array} history collection of history objects containing a cost property
 */
const calculateListingPrice = (history = []) => {
  const lastHistory = _.last(history)
  return lastHistory ? lastHistory.price : 0
}

export default calculateListingPrice
