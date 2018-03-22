import convertWowCurrency from './convertWowCurrency'

it('correctly converts a value into a WoW currency object', () => {
  const result = convertWowCurrency(999999)
  expect(result).toEqual({ copper: 99, silver: 99, gold: 99 })
})

it('correctly converts a negative value into a WoW currency object', () => {
  const result = convertWowCurrency(-56782)
  expect(result).toEqual({ copper: -82, silver: -67, gold: -5 })
})
