import calculateAHListingCost from './calculateAHListingCost'

it('correctly calculates listing cost for a 2h auction', () => {
  const result = calculateAHListingCost(10000, 2)
  expect(result).toBe(1500)
})

it('correctly calculates listing cost for a 8h auction', () => {
  const result = calculateAHListingCost(10000, 8)
  expect(result).toBe(3000)
})

it('correctly calculates listing cost for a 24h auction', () => {
  const result = calculateAHListingCost(10000, 24)
  expect(result).toBe(6000)
})

it('throws an error when listing for an invalid duration', () => {
  expect(() => calculateAHListingCost(10000, 66)).toThrow()
})
