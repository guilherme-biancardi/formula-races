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
  });

  const getSeason = computed(() => state.season);
  const getDrivers = computed(() => state.drivers);
  const getTeams = computed(() => state.teams);
  const getRaces = computed(() => state.races);

  const setSeason = (season) => (state.season = season);
  const setDrivers = (drivers) => (state.drivers = drivers);
  const setTeams = (teams) => (state.teams = teams);
  const setRaces = (races) => (state.races = races);

  const getDriversStandings = async () =>
    await api.get(`${getSeason.value}/driverStandings.json?limit=1000`);

  const getTeamsStandings = async () =>
    await api.get(`${getSeason.value}/constructorStandings.json?limit=1000`);

  const getRacesResults = async () =>
    await api.get(`${getSeason.value}/results.json?limit=1000`);

  const getAll = () =>
    Promise.all([
      getDriversStandings(),
      getTeamsStandings(),
      getRacesResults(),
    ]).then(([drivers, teams, races]) => {
      const [driversList] = drivers.data.MRData.StandingsTable.StandingsLists;
      setDrivers(driversList.DriverStandings);

      const [constructorList] = teams.data.MRData.StandingsTable.StandingsLists;
      setTeams(constructorList?.ConstructorStandings);

      const racesList = races.data.MRData.RaceTable.Races;
      setRaces(racesList);
    });

  return { getSeason, getDrivers, getTeams, getRaces, setSeason, getAll };
});
