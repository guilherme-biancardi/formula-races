import { defineStore } from 'pinia';
import { computed, shallowReactive, watch } from 'vue';
import { useDataStore } from './data';
import { piniaInstance } from '.';
import { useDatetime } from '@/ts/composables/datetime';
import { getResultByRoundRequest, type Result } from '@/requests/races';
import { useAppStore } from './app';

interface RaceStore {
  round: number;
  results: Result[];
}

const dataStore = useDataStore(piniaInstance);
const appStore = useAppStore(piniaInstance);

const { DateTime } = useDatetime();

export const useRaceStore = defineStore('race', () => {
  const state = shallowReactive<RaceStore>({
    round: 1,
    results: []
  });

  const currentRace = computed(() =>
    dataStore.getRaces.find((race) => +race.round === state.round)
  );

  const currentRound = computed(() => state.round);

  const raceInfo = computed(() => {
    if (currentRace.value) {
      const { date, Circuit } = currentRace.value;
      const { Location, circuitName } = Circuit;

      return {
        name: circuitName,
        country: Location.country,
        locality: Location.locality,
        date: DateTime.fromSQL(date).toFormat('dd/LL/yyyy')
      };
    }

    return null;
  });

  const getResults = computed(() => state.results);

  const selectRound = (round: number) => (state.round = round);

  const requestResultsByRound = async (round: number) => {
    const { data } = await getResultByRoundRequest({
      round,
      limit: 500
    });

    if (data.value && data.value.MRData.RaceTable.Races?.length) {
      const [{ Results }] = data.value.MRData.RaceTable.Races;
      state.results = Results;
    } else {
      state.results = [];
    }
  };

  watch(currentRound, requestResultsByRound);
  watch(
    computed(() => appStore.getSeason),
    () => (state.round = 1)
  );

  return {
    currentRace,
    currentRound,
    raceInfo,
    getResults,
    selectRound,
    requestResultsByRound
  };
});
