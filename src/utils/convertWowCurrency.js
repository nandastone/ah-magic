const convertWowCurrency = (value = 0) => {
  let amount = value

  const copper = Math.floor(amount % 100)
  amount = (amount - copper) / 100
  const silver = Math.floor(amount % 100)
  const gold = Math.floor((amount - silver) / 100)

  return { gold, silver, copper }
}

export default convertWowCurrency
