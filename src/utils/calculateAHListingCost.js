const calculateAHListingCost = (value, duration = 24) => {
  let percent = 0
  switch (duration) {
    case 2:
      percent = 0.15
      break;
    case 8:
      percent = 0.3
      break;
    case 24:
      percent = 0.6
      break;
    default:
      throw new Error(`Invalid Auction House duration: ${duration}`)
  }
  return Math.floor(value * percent)
}

export default calculateAHListingCost
