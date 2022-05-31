<template>
  <div class="stats-select">
    <SelectComponent :label="'select driver:'" @select="selectDriver">
      <option
        :value="index"
        v-for="({ Driver }, index) in drivers"
        :key="index"
      >
        {{ Driver.givenName }} {{ Driver.familyName }}
      </option>
    </SelectComponent>
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
      :result="state.results[state.raceSelected]"
      :race="races[state.raceSelected]"
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

const store = useStore()
const statsStore = useStatsStore()
const { axios } = useApp()
const { getDriverResults } = useDriverResult()

const season = computed(() => store.getSeason)
const drivers = computed(() => useDriversStore().getStanding)
const races = computed(() => useRacesStore().getTable.Races)

const state = reactive({
  graphic: null,
  results: [],
  raceSelected: 0,
  driverName: '',
  loading: true
})

const selectRace = (index) => (state.raceSelected = index)

const selectDriver = async (index) => {
  state.loading = true

  const { Driver } = drivers.value[index]
  const { driverId, familyName } = Driver
  const { graphic, results } =
    statsStore.getDriverStat(driverId) ||
    (await getDriverResults(axios, season.value, driverId))

  state.graphic = graphic
  state.results = results
  state.driverName = familyName

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
</style>
