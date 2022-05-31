const getDriverResults = async (axios, year, driver) => {
  const { data } = await axios.get(
      `${year}/drivers/${driver}/results.json`
  )

  const { Races } = data.MRData.RaceTable

  return setDriverResults(mapResults(Races))
}

const mapResults = (results) =>
  results.map(({ Results, raceName }) => ({ Results, raceName }))

const setDriverResults = (results) => {
  const driverResult = {
    graphic: {},
    results: []
  }
  results.forEach(({ Results, raceName }) => {
    const [result] = Results

    driverResult.graphic[raceName] = result.points
    driverResult.results.push(result)
  })

  return driverResult
}

export const useDriverResult = () => ({
  getDriverResults
})
