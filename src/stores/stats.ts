import { defineStore } from 'pinia';
import { computed, reactive, watch } from 'vue';
import { useDataStore } from './data';
import { piniaInstance } from '.';
import { getResultsByDriverRequest } from '@/requests/races';
import { useAppStore } from './app';

export type DriverStat = {
  driverId: string;
  driverName: string;
  pointsPerRaces: number[];
  poles: number;
  dnf: number;
  podiums: number;
};

interface StatsStore {
  stats: DriverStat[];
}

const dataStore = useDataStore(piniaInstance);
const appStore = useAppStore(piniaInstance);

export const useStatsStore = defineStore('stats', () => {
  const state = reactive<StatsStore>({
    stats: []
  });

  const getStatsByDriver = computed(
    () => (driverId: string) => state.stats.find((stat) => stat.driverId === driverId)
  );

  const requestResults = async (driverId: string) => {
    const stat = getStatsByDriver.value(driverId);

    if (!stat) {
      const { data } = await getResultsByDriverRequest({
        limit: 500,
        driverId
      });

      if (data.value) {
        const { Races } = data.value.MRData.RaceTable;

        const pointsPerRaces: number[] = [];
        let polesPosition = 0;
        let dnfCount = 0;
        let podiumCount = 0;

        dataStore.getRaces.forEach((race) => {
          const result = Races.find((value) => value.raceName === race.raceName);

          if (result?.Results) {
            const [{ points, grid, status, position }] = result.Results;

            pointsPerRaces.push(+points);

            if (grid === '1') {
              polesPosition++;
            }

            if (['1', '2', '3'].includes(position)) {
              podiumCount++;
            }

            if (status !== 'Finished' && !status.match(/\+\d+ Lap/g)) {
              dnfCount++;
            }
          } else {
            pointsPerRaces.push(0);
          }
        });

        driverStatFactory(driverId, {
          pointsPerRaces,
          poles: polesPosition,
          dnf: dnfCount,
          podiums: podiumCount
        });
      }
    }
  };

  const driverStatFactory = (
    driverId: string,
    stats: Pick<DriverStat, 'pointsPerRaces' | 'poles' | 'dnf' | 'podiums'>
  ) => {
    const driver = dataStore.getDriverById(driverId);

    state.stats.push({
      driverId,
      driverName: `${driver?.givenName} ${driver?.familyName}`,
      pointsPerRaces: stats.pointsPerRaces,
      poles: stats.poles,
      dnf: stats.dnf,
      podiums: stats.podiums
    });
  };

  watch(
    computed(() => appStore.getSeason),
    () => (state.stats = [])
  );

  return {
    getStatsByDriver,
    requestResults
  };
});
