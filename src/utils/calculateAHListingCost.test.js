import calculateAHListingCost from './calculateAHListingCost'

test('correctly calculates listing cost for a 2h auction', () => {
  const result = calculateAHListingCost(10000, 2)
  expect(result).toBe(1500)
})

test('correctly calculates listing cost for a 8h auction', () => {
  const result = calculateAHListingCost(10000, 8)
  expect(result).toBe(3000)
})

test('correctly calculates listing cost for a 24h auction', () => {
  const result = calculateAHListingCost(10000, 24)
  expect(result).toBe(6000)
})

test('throws an error when listing for an invalid duration', () => {
  expect(() => calculateAHListingCost(10000, 66)).toThrow()
})
