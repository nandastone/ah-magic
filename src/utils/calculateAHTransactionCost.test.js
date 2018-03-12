import calculateAHTransactionCost from './calculateAHTransactionCost'

test('correctly calculates transaction (sale) cost for an auction', () => {
  const result = calculateAHTransactionCost(10000)
  expect(result).toBe(500)
})
