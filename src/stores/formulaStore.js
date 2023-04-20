import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { useDatetime } from "../utils/datetime";
import axios from "axios";

const { getNow } = useDatetime();
const currentYear = getNow().year;

const api = axios.create({ baseURL: import.meta.env.VITE_APP_API });

export const useFormulaStore = defineStore("formula", () => {
  const state = reactive({
    season: currentYear,
    drivers: null,
    teams: null,
    races: null,
    driversResults: {},
  });

  const getSeason = computed(() => state.season);
  const getDrivers = computed(() => state.drivers);
  const getTeams = computed(() => state.teams);
  const getRaces = computed(() => state.races);
  const getDriversResults = computed(() => state.driversResults);

  const setSeason = (season) => (state.season = season);

  const setDrivers = (drivers) => {
    const [driversList] = drivers.data.MRData.StandingsTable.StandingsLists;
    state.drivers = driversList.DriverStandings;
  };

  const setTeams = (teams) => {
    const [constructorList] = teams.data.MRData.StandingsTable.StandingsLists;
    state.teams = constructorList?.ConstructorStandings;
  };

  const setRaces = (races) => {
    const racesList = races.data.MRData.RaceTable.Races;
    state.races = racesList;
  };

  const getDriversStandings = async () =>
    await api.get(`${getSeason.value}/driverStandings.json?limit=1000`);

  const getTeamsStandings = async () =>
    await api.get(`${getSeason.value}/constructorStandings.json?limit=1000`);

  const getRacesResults = async () =>
    await api.get(`${getSeason.value}/results.json?limit=1000`);

  const setDriverResults = async (driverId) => {
    const { data } = await api.get(
      `${getSeason.value}/drivers/${driverId}/results.json?limit=1000`
    );

    state.driversResults[driverId] = data.MRData.RaceTable.Races;
  };

  const getDriverByIndex = (index) => {
    const { Driver } = state.drivers.at(index);
    const { givenName, familyName } = Driver;

    return {
      name: `${givenName} ${familyName}`,
      id: Driver.driverId,
    };
  };

  const getDriverResult = (index) => {
    const driver = getDriverByIndex(index);

    return state.driversResults[driver.id];
  };

  const getAll = async () => {
    const [drivers, teams, races] = await Promise.all([
      getDriversStandings(),
      getTeamsStandings(),
      getRacesResults(),
    ]);

    setDrivers(drivers);
    setTeams(teams);
    setRaces(races);

    if (getDriversResults.value) {
      state.driversResults = {};
    }
  };

  return {
    getSeason,
    getDrivers,
    getTeams,
    getRaces,
    getDriversResults,
    setSeason,
    getAll,
    setDriverResults,
    getDriverByIndex,
    getDriverResult,
  };
});
