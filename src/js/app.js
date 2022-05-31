import { useRouter } from 'vue-router'
import axios from 'axios'
import moment from 'moment'
import { useRacesStore } from '@/store/races'
import { useDriversStore } from '@/store/drivers'
import { useConstructorsStore } from '@/store/constructor'

const axiosCreated = axios.create({ baseURL: 'https://ergast.com/api/f1' })

const getData = (route, year, limit = 1000) =>
  axiosCreated.get(`/${year}/${route}.json?limit=${limit}`)

const getConstructorStandings = async (year) => {
  const { data } = await getData('constructorStandings', year)

  const constructorStandings = data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings

  useConstructorsStore().setConstructorStanding(constructorStandings || [])
}

const getDriverStandings = async (year) => {
  const { data } = await getData('driverStandings', year)

  const [{ DriverStandings }] = data.MRData.StandingsTable.StandingsLists

  useDriversStore().setDriverStanding(DriverStandings)
}

const getRacesTable = async (year) => {
  const { data } = await getData('results', year)

  useRacesStore().setRaceTable(data.MRData.RaceTable)
}

export const useApp = () => ({
  getConstructorStandings,
  getDriverStandings,
  getRacesTable,
  router: useRouter(),
  moment,
  axios: axiosCreated
})
