import calculateListingPrice from './calculateListingPrice'

it('should correctly calculate the price for a listing\'s history', () => {
  const history = [
    { type: 'purchase' },
    { type: 'listing', price: 30000 },
    { type: 'sale', price: 25000 }
  ]
  const result = calculateListingPrice(history)
  expect(result).toBe(25000)
})

it('should return a default value when no history is provided', () => {
  const result = calculateListingPrice([])
  expect(result).toBe(0)
})
