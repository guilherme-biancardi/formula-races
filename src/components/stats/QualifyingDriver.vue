<template>
  <GraphicComponent :length="length" :index="index" :title="'Selected Race Qualifying'">
    <div class="content">
      <h2>
        {{ circuit.name }} -
        <span
          >{{ circuit.location.locality }}, {{ circuit.location.country }}</span
        >
      </h2>
      <ul class="drivers-list">
        <li v-for="(driver, index) in state.driversQualifying" :key="index">
          <p
            v-for="(qualifying, key) in getResults(
              driver[raceSelected]?.QualifyingResults[0] || []
            )"
            :key="key"
          >
            <span>{{ key }}:</span> {{ qualifying }}
          </p>
        </li>
      </ul>
    </div>
  </GraphicComponent>
</template>

<script setup>
import { useApp } from '@/js/app'
import { useQualifyngStore } from '@/store/qualifyngs'
import { useStore } from '@/store/store'
import { computed, reactive, watch } from 'vue'
import GraphicComponent from './GraphicComponent.vue'

const { axios } = useApp()
const store = useStore()
const qualifyingStore = useQualifyngStore()

const props = defineProps({
  length: Number,
  index: Number,
  race: Object,
  driversName: Array,
  raceSelected: Number
})

const state = reactive({
  driversQualifying: []
})

const season = computed(() => store.getSeason)
const circuit = computed(() => {
  const { Circuit } = props.race
  return { name: Circuit.circuitName, location: Circuit.Location }
})

const getResults = (result) => {
  try {
    const { Driver, Constructor, Q1, Q2, Q3, number } = result

    return {
      driver: `${Driver.givenName} ${Driver?.familyName}`,
      team: Constructor.name,
      number,
      Q1: Q1 || '---',
      Q2: Q2 || '---',
      Q3: Q3 || '---'
    }
  } catch {
    return null
  }
}

const getQualifying = (drivers) =>
  drivers.forEach(async ({ driverId }, index) => {
    const qualifying = qualifyingStore.getQualifying(driverId)
    if (qualifying) {
      state.driversQualifying[index] = qualifying.results
    } else {
      const { data } = await axios.get(
        `/${season.value}/drivers/${driverId}/qualifying.json?limit=1000`
      )
      const { Races } = data.MRData.RaceTable
      state.driversQualifying[index] = Races
      qualifyingStore.setQualifying(Races, driverId)
    }
  })

getQualifying(props.driversName)

watch(
  computed(() => props.driversName),
  (drivers) => getQualifying(drivers),
  { deep: true }
)
</script>

<style scoped>
.content {
  --span: #555;
}

.dark-mode .content {
  --span: #999;
}

.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 44px;
  height: 100%;
}

h2 {
  font-size: 1.05em;
  font-weight: 500;
}

h2 > span {
  font-size: 0.85em;
}

.drivers-list {
  display: flex;
  align-content: center;
  justify-content: space-between;
}

.drivers-list li span {
  text-transform: capitalize;
  font-family: var(--f1-regular);
  font-weight: 500;
  color: var(--span);
}

.drivers-list li {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
