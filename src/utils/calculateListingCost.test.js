import calculateListingCost from './calculateListingCost'

it('correctly calculates the cost for a listing\'s history', () => {
  const history = [
    { type: 'purchase', cost: 10000 },
    { type: 'listing', cost: 5000 },
    { type: 'sale', cost: 1250 }
  ]
  const result = calculateListingCost(history)
  expect(result).toBe(16250)
})
