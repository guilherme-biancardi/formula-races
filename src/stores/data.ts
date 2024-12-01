import {
  getDriversRequest,
  getDriversStandingsRequest,
  type Driver,
  type DriverStanding,
  type GetDriversResponse,
  type GetDriversStandingsResponse
} from '@/requests/drivers';
import { getRacesRequest, type GetRacesResponse, type Race } from '@/requests/races';
import { getSeasonsRequest, type Season } from '@/requests/seasons';
import {
  getConstructorsStandingsRequest,
  type ConstructorStanding,
  type GetConstructorsStandingsResponse
} from '@/requests/teams';
import { defineStore } from 'pinia';
import { computed, shallowReactive } from 'vue';

interface DataStore {
  seasons: Season[];
  driversStandings: DriverStanding[];
  constructorsStandings: ConstructorStanding[];
  races: Race[];
  drivers: Driver[];
}

type RequestAllPromiseResponse = [
  GetDriversStandingsResponse | null,
  GetConstructorsStandingsResponse | null,
  GetRacesResponse | null,
  GetDriversResponse | null
];

export const useDataStore = defineStore('data', () => {
  const state = shallowReactive<DataStore>({
    seasons: [],
    driversStandings: [],
    constructorsStandings: [],
    races: [],
    drivers: []
  });

  const getSeasons = computed(() => state.seasons);
  const getDriversStandings = computed(() => state.driversStandings);
  const getConstructorsStandings = computed(() => state.constructorsStandings);
  const getRaces = computed(() => state.races);
  const getDrivers = computed(() => state.drivers);

  const requestSeasons = async () => {
    const { data } = await getSeasonsRequest({
      limit: 500
    });

    if (data.value) {
      const { Seasons: seasons } = data.value.MRData.SeasonTable;
      state.seasons = seasons;
    }
  };

  const setDriversStandings = (response: GetDriversStandingsResponse | null) => {
    if (response) {
      const [{ DriverStandings }] = response.MRData.StandingsTable.StandingsLists;
      state.driversStandings = DriverStandings;
    }
  };

  const setConstructorsStandings = (response: GetConstructorsStandingsResponse | null) => {
    if (response) {
      const [{ ConstructorStandings }] = response.MRData.StandingsTable.StandingsLists;
      state.constructorsStandings = ConstructorStandings;
    }
  };

  const setRaces = (response: GetRacesResponse | null) => {
    if (response) {
      const { Races } = response.MRData.RaceTable;
      state.races = Races;
    }
  };

  const setDrivers = (response: GetDriversResponse | null) => {
    if (response) {
      const { Drivers } = response.MRData.DriverTable;
      state.drivers = Drivers;
    }
  };

  const requestAll = async () => {
    const params = {
      limit: 500
    };

    const results = await Promise.allSettled([
      getDriversStandingsRequest(params),
      getConstructorsStandingsRequest(params),
      getRacesRequest(params),
      getDriversRequest(params)
    ]);

    const [driversStandings, constructors, races, drivers] = results.map((result) =>
      result.status === 'fulfilled' ? result.value.data.value : null
    ) as RequestAllPromiseResponse;

    setDriversStandings(driversStandings);
    setConstructorsStandings(constructors);
    setRaces(races);
    setDrivers(drivers);
  };

  const getDriverById = (id: string) => state.drivers.find((driver) => driver.driverId === id);

  return {
    getSeasons,
    getDriversStandings,
    getConstructorsStandings,
    getRaces,
    getDrivers,
    requestAll,
    requestSeasons,
    getDriverById
  };
});
