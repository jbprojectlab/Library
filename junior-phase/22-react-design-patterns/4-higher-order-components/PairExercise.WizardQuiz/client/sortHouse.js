const sortHouse = answers => {
  const results = answers.reduce((obj, houseName) => {
    obj[houseName] = obj[houseName] || 0
    obj[houseName]++
    return obj
  }, {})

  let max = 0
  let house = ''
  for (let houseName in results) {
    if (results[houseName] > max) {
      max = results[houseName]
      house = houseName
    }
  }
  return house
}

export default sortHouse
