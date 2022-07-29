<template>
  <div class="stats-select">
    <div class="driver-selects">
      <SelectComponent
        :label="'select driver:'"
        @select="selectDriver"
        @click="state.selectIndex = 0"
      >
        <option
          :value="index"
          v-for="({ Driver }, index) in drivers"
          :key="index"
          :disabled="state.driversListExcludes.some((i) => i === index)"
        >
          {{ Driver.givenName }} {{ Driver.familyName }}
        </option>
      </SelectComponent>
      <button
        v-if="!state.compareDrivers"
        @click="state.compareDrivers = !state.compareDrivers"
      >
        <MaterialIcon :icon="'mdi-plus'"></MaterialIcon>
      </button>
      <SelectComponent
        :label="'select driver:'"
        @select="selectDriver"
        @click="state.selectIndex = 1"
        v-else
      >
        <option
          :value="index"
          v-for="({ Driver }, index) in drivers"
          :disabled="state.driversListExcludes.some((i) => i === index)"
          :key="index"
        >
          {{ Driver.givenName }} {{ Driver.familyName }}
        </option>
      </SelectComponent>
      <button v-if="state.compareDrivers" @click="reset">
        <MaterialIcon :icon="'mdi-delete-outline'"></MaterialIcon>
      </button>
    </div>

    <SelectComponent
      :label="`select ${state.driverName} race:`"
      @select="selectRace"
    >
      <option :value="index" v-for="(race, index) in races" :key="index">
        {{ race.raceName }}
      </option>
    </SelectComponent>
  </div>
  <div class="stats-content">
    <GraphicComponent
      :data="state.graphic"
      :isLoading="state.loading"
    ></GraphicComponent>
    <DriverRace
      :result="state.results"
      :race="races[state.raceSelected]"
      :compareDrivers="state.compareDrivers"
      :raceSelected="state.raceSelected"
      :index="state.selectIndex"
      :drivers="state.driversListExcludes"
      @setDriverName="setDriverName"
    ></DriverRace>
  </div>
</template>

<script setup>
import { useStore } from '@/store/store'
import { computed, onBeforeMount, reactive, watch } from 'vue'
import GraphicComponent from '../components/stats/GraphicComponent.vue'
import { useDriverResult } from '@/js/driverResult'
import { useApp } from '@/js/app'
import DriverRace from '@/components/stats/DriverRace.vue'
import SelectComponent from '@/components/utilities/SelectComponent.vue'
import { useDriversStore } from '@/store/drivers'
import { useRacesStore } from '@/store/races'
import { useStatsStore } from '@/store/stats'
import MaterialIcon from '@/components/utilities/MaterialIcon.vue'

const store = useStore()
const statsStore = useStatsStore()
const { axios } = useApp()
const { getDriverResults } = useDriverResult()

const season = computed(() => store.getSeason)
const drivers = computed(() => useDriversStore().getStanding)
const races = computed(() => useRacesStore().getTable.Races)

const state = reactive({
  graphic: [],
  results: [],
  raceSelected: 0,
  driverName: '',
  loading: true,
  compareDrivers: false,
  selectIndex: 0,
  driversListExcludes: []
})

const selectRace = (index) => (state.raceSelected = index)

const reset = () => {
  state.graphic = state.graphic.slice(0, 1)
  state.results = state.results.slice(0, 1)
  state.driversListExcludes = state.driversListExcludes.slice(0, 1)

  state.selectIndex = 0
  state.driverName =
    drivers.value[state.driversListExcludes[0]].Driver.familyName
  state.compareDrivers = false
}

const setDriverName = (index) =>
  (state.driverName = drivers.value[index].Driver.familyName)

const selectDriver = async (index) => {
  state.loading = true

  const { Driver } = drivers.value[index]
  const { driverId, givenName, familyName } = Driver
  const { graphic, results } =
    (await statsStore.getDriverStat(driverId)) ||
    (await getDriverResults(axios, season.value, driverId))

  state.graphic[state.selectIndex] = {
    name: `${givenName} ${familyName}`,
    data: graphic
  }

  state.results[state.selectIndex] = results

  state.driverName = familyName
  state.driverSelected = state.selectIndex

  state.driversListExcludes[state.selectIndex] = index

  statsStore.setDriverStat(graphic, results, driverId)
  state.loading = false
}

onBeforeMount(selectDriver(0))

watch(drivers, () => {
  statsStore.cleanStats()
  selectDriver(0)
})
</script>

<style scoped>
.stats-select {
  --item: #fff;
}

.dark-mode .stats-select {
  --item: #252525;
}

.stats-select,
.stats-content {
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: 2.2fr 1fr;
}

.stats-content {
  min-height: 400px;
}

.driver-selects {
  display: flex;
  align-items: flex-end;
  column-gap: 12px;
}

.driver-selects button {
  width: 32px;
  height: 32px;
  border-radius: 5px;
  background-color: var(--item);
  box-shadow: var(--shadow);
  cursor: pointer;
  font-size: 1.05em;
  color: var(--red);
}
</style>
