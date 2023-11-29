import {
  getDriversRequest,
  type DriverStandings,
  type GetDriversResponse
} from '@/requests/formula/drivers';
import { defineStore } from 'pinia';
import { computed, shallowReactive } from 'vue';
import { useAppStore } from './appStore';
import { pinia } from '.';
import {
  getTeamsRequest,
  type ConstructorStandings,
  type GetTeamsResponse
} from '@/requests/formula/teams';

const appStore = useAppStore(pinia);

interface FormulaStoreState {
  drivers: DriverStandings[];
  teams: ConstructorStandings[];
}

export const useFormulaStore = defineStore('formula', () => {
  const state = shallowReactive<FormulaStoreState>({
    drivers: [],
    teams: []
  });

  const getDrivers = computed(() => state.drivers);
  const getTeams = computed(() => state.teams);

  const setDrivers = (drivers: GetDriversResponse) => {
    const [driversList] = drivers.MRData.StandingsTable.StandingsLists;
    state.drivers = driversList.DriverStandings;
  };

  const setTeams = (teams: GetTeamsResponse) => {
    const [constructorList] = teams.MRData.StandingsTable.StandingsLists;
    state.teams = constructorList?.ConstructorStandings;
  };

  const requestAll = async () => {
    const driversRequest = getDriversRequest({ season: appStore.getSeason });
    const teamsRequest = getTeamsRequest({ season: appStore.getSeason });

    const [drivers, teams] = await Promise.all([driversRequest.execute(), teamsRequest.execute()]);

    setDrivers(drivers.data);
    setTeams(teams.data);
  };

  return {
    getDrivers,
    getTeams,
    requestAll
  };
});
