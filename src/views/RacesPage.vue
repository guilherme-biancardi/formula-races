<template>
  <div class="races-content">
    <header>
      <RaceInfo></RaceInfo>

      <VueSelect
        :options="raceOptions"
        v-model="raceSelected"
        @option-selected="(option) => raceStore.selectRound(option.value)"
        :is-clearable="false"
        :style="{ width: '25ch' }"
        placeholder="Selecione uma corrida"
        :should-autofocus-option="false"
      ></VueSelect>
    </header>

    <AppTransition name="slide-x" mode="out-in">
      <Suspense timeout="0">
        <div class="result-content" :key="raceStore.currentRound">
          <AsyncContent :fetch-data="requestResult">
            <TableComponent
              :items="raceStore.getResults"
              :headers="tableHeaders"
              :grid-style="cssModule.gridStyle"
              v-if="raceStore.getResults.length"
            >
              <template v-slot="{ item }">
                <li style="text-align: center">{{ `${item.grid}º` }}</li>
                <li>
                  {{ item.Driver.givenName }}
                  <span class="driver-name">{{ item.Driver.familyName }}</span>
                </li>
                <li>{{ item.Constructor.name }}</li>
                <li style="text-align: center">{{ item.Time?.time || '---' }}</li>
                <li style="text-align: center">{{ item.status }}</li>
                <li style="text-align: center">{{ item.points }}</li>
              </template>
            </TableComponent>

            <ResultEmpty message="Resultados não encontrados" v-else></ResultEmpty>
          </AsyncContent>
        </div>

        <template #fallback>
          <SkeletonComponent></SkeletonComponent>
        </template>
      </Suspense>
    </AppTransition>
  </div>
</template>

<script setup lang="ts">
import AsyncContent from '@/components/contents/AsyncContent.vue';
import RaceInfo from '@/components/pages/races/RaceInfo.vue';
import AppTransition from '@/components/util/AppTransition.vue';
import ResultEmpty from '@/components/util/ResultEmpty.vue';
import SkeletonComponent from '@/components/util/SkeletonComponent.vue';
import TableComponent, { type TableHeader } from '@/components/util/TableComponent.vue';
import { useDataStore } from '@/stores/data';
import { useRaceStore } from '@/stores/race';
import { useGlobal } from '@/ts/composables/global';
import { ref, useCssModule } from 'vue';
import VueSelect, { type Option } from 'vue3-select-component';

const dataStore = useDataStore();
const raceStore = useRaceStore();

const { fonts } = useGlobal();

const cssModule = useCssModule() as Record<'gridStyle', string>;

type RaceOption = Option<number>;

const raceOptions: RaceOption[] = dataStore.getRaces.map((race) => ({
  label: race.raceName,
  value: +race.round
}));

const raceSelected = ref<number>(0);

const tableHeaders: TableHeader[] = [
  {
    text: 'grid',
    center: true
  },
  {
    text: 'piloto'
  },
  {
    text: 'equipe'
  },
  {
    text: 'tempo',
    center: true
  },
  {
    text: 'status',
    center: true
  },
  {
    text: 'pontos',
    center: true
  }
];

const requestResult = async () => raceStore.requestResultsByRound(raceStore.currentRound);
</script>

<style module>
:export {
  gridStyle: 100px repeat(2, 1fr) 14ch 1fr 80px;
}
</style>

<style scoped>
.races-content header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.races-content {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.races-content {
  width: 100%;
  height: 100%;
  row-gap: 12px;
  overflow: hidden;
}

.result-content {
  display: grid;
  place-items: center;
  flex-grow: 1;
  overflow: hidden;
}

.driver-name {
  font-family: v-bind('fonts?.fontBold');
}
</style>
