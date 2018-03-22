import calculateListingPrice from './calculateListingPrice'

it('correctly calculates the price for a listing\'s history', () => {
  const history = [
    { type: 'purchase' },
    { type: 'listing', price: 30000 },
    { type: 'sale', price: 25000 }
  ]
  const result = calculateListingPrice(history)
  expect(result).toBe(25000)
})
