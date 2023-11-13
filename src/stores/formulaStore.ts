import type { ApiResponse } from '@/requests';
import {
  getDriversRequest,
  type DriverStandings,
  type GetDriversResponse
} from '@/requests/formula/drivers';
import { defineStore } from 'pinia';
import { computed, shallowReactive } from 'vue';

interface FormulaStoreState {
  drivers: DriverStandings[];
}

export const useFormulaStore = defineStore('formula', () => {
  const state = shallowReactive<FormulaStoreState>({
    drivers: []
  });

  const getDrivers = computed(() => state.drivers);

  const setDrivers = (drivers: ApiResponse<GetDriversResponse>) => {
    const [driversList] = drivers.MRData.StandingsTable.StandingsLists;
    state.drivers = driversList.DriverStandings;
  };

  const requestAll = async () => {
    const [drivers] = await Promise.all([getDriversRequest.execute()]);

    setDrivers(drivers.data);
  };

  return {
    getDrivers,
    requestAll
  };
});
