import calculateListingFinances from './calculateListingFinances'

it('should correctly calculate the finances for a listing\'s history', () => {
  const history = [
    { type: 'purchase', cost: 10000 },
    { type: 'listing', cost: 5000, price: 30000 },
    { type: 'sale', cost: 1250, price: 25000 }
  ]
  const result = calculateListingFinances(history)
  expect(result).toEqual({ cost: 16250, price: 25000, profit: 8750 })
})

it('should return default values for missing data', () => {
  const history = [
    { type: 'purchase', cost: 0 },
    { type: 'sale', cost: 0, price: 0 }
  ]
  const result = calculateListingFinances(history)
  expect(result).toEqual({ cost: 0, price: 0, profit: 0 })
})

it('should calculate default profit for missing cost', () => {
  const history = [
    { type: 'purchase', cost: 0 },
    { type: 'listing', cost: 0, price: 10000 }
  ]
  const result = calculateListingFinances(history)
  expect(result).toEqual({ cost: 0, price: 10000, profit: 10000 })
})

it('should calculate default profit for missing price', () => {
  const history = [
    { type: 'purchase', cost: 10000 }
  ]
  const result = calculateListingFinances(history)
  expect(result).toEqual({ cost: 10000, price: 0, profit: 0 })
})
