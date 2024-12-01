<template>
  <div class="stats-content">
    <VueSelect
      v-model="drivers"
      :options="driverOptions"
      :is-multi="true"
      placeholder="Selecione um piloto"
      :is-disabled="false"
      :should-autofocus-option="false"
      :displayed-options="optionsDisplayed"
    >
      <template #tag="{ option, removeOption }">
        <span class="driver-tag">
          <p>{{ option.label }}</p>
          <button @click="removeOption">
            <IconComponent :path="PhX" :options="{ size: 16, weight: 'bold' }"></IconComponent>
          </button>
        </span>
      </template>
      <template #no-options>
        <p v-if="drivers.length >= maxDriversToCompare">Limite de pilotos atingidos</p>
        <p v-else>Piloto não encontrado</p>
      </template>
    </VueSelect>

    <AppTransition name="fade" mode="out-in">
      <div class="chart-grid" v-if="driversLength">
        <PointsPerRaces :data="driversStats" :key="driversLength"></PointsPerRaces>
        <OtherStats :data="driversStats" :key="driversLength"></OtherStats>
      </div>
      <ResultEmpty message="Não há dados selecionados" v-else style="flex-grow: 1;"></ResultEmpty>
    </AppTransition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDataStore } from '@/stores/data';
import PointsPerRaces from '@/components/pages/stats/PointsPerRaces.vue';
import { useStatsStore, type DriverStat } from '@/stores/stats';
import OtherStats from '@/components/pages/stats/OtherStats.vue';
import VueSelect, { type Option } from 'vue3-select-component';
import { watchArray } from '@vueuse/core';
import IconComponent from '@/components/util/IconComponent.vue';
import { PhX } from '@phosphor-icons/vue';
import { useGlobal } from '@/ts/composables/global';
import ResultEmpty from '@/components/util/ResultEmpty.vue';
import AppTransition from '@/components/util/AppTransition.vue';

type DriverOption = Option<string>;

const dataStore = useDataStore();
const statsStore = useStatsStore();

const { colors } = useGlobal();
const maxDriversToCompare = 5;

const driverOptions = computed<DriverOption[]>(() =>
  dataStore.getDrivers.map((driver) => ({
    label: `${driver.givenName} ${driver.familyName}`,
    value: driver.driverId
  }))
);

const optionsDisplayed = computed(() =>
  drivers.value.length < maxDriversToCompare ? driverOptions.value : []
);

const driversStats = ref<DriverStat[]>([]);
const drivers = ref<string[]>([]);

const driversLength = computed(() => driversStats.value.length);

const addDriver = async (value: string) => {
  await statsStore.requestResults(value);

  const stat = statsStore.getStatsByDriver(value);
  if (stat) driversStats.value.push(stat);
};

const removeDriver = (value: string) => {
  const index = driversStats.value.findIndex((item) => item.driverId === value);
  driversStats.value.splice(index, 1);
};

watchArray(
  drivers,
  (list, old, added, removed) => {
    added.forEach((item) => addDriver(item));
    removed.forEach((item) => removeDriver(item));
  },
  { deep: true }
);
</script>

<style scoped>
.stats-content {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  height: 100%;
}

.compare-content {
  display: flex;
  align-items: center;
  column-gap: 8px;
}

.chart-grid {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr minmax(300px, 600px);
  gap: 8px;
  flex-grow: 1;
  overflow: hidden;
}

.driver-tag {
  display: flex;
  align-items: center;
  column-gap: 8px;
  border-radius: 4px;
  padding: 4px 12px;
  background-color: v-bind('colors?.darkPrimary');
  color: #fff;
}

.driver-tag p {
  font-size: 0.9em;
}

.driver-tag button {
  color: #fff;
}
</style>
