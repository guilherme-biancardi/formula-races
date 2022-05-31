<template>
  <div class="races-content">
    <div class="circuit-content" v-if="races">
      <CircuitText :circuit="race.getCircuit()"></CircuitText>
      <SelectComponent @select="selectRace">
        <option :value="index" v-for="(round, index) in races" :key="index">
          {{ round.raceName }}
        </option>
      </SelectComponent>
    </div>
    <TableComponent
      :headers="races ? ['position', 'driver', 'team', 'points earned'] : null"
      :rows="9"
    >
      <TableItem
        v-for="({ Driver, Constructor, ...item }, index) in race.getResult()"
        :key="index"
      >
        <li>
          <span>{{ item.positionText }}</span>
        </li>
        <li>
          {{ Driver.givenName }} <span>{{ Driver.familyName }}</span>
        </li>
        <li>{{ Constructor ? Constructor.name : '-' }}</li>
        <li>{{ item.points }}</li>
      </TableItem>
    </TableComponent>
  </div>
</template>

<script setup>
import SelectComponent from '@/components/utilities/SelectComponent.vue'
import { useRacesStore } from '@/store/races'
import { computed, reactive, watch } from 'vue'
import TableComponent from '@/components/utilities/TableComponent.vue'
import TableItem from '@/components/utilities/TableItem.vue'
import CircuitText from '../components/race/CircuitText.vue'
import { useStore } from '@/store/store'

const raceStore = useRacesStore()

const state = reactive({
  raceSelected: 0
})

const selectRace = (value) => (state.raceSelected = value)

const races = computed(() => raceStore.getTable.Races || null)

const race = computed(() => ({
  getCircuit: () => {
    const round = races.value[state.raceSelected]
    const { circuitName, Location } = round.Circuit

    return {
      name: circuitName,
      country: Location.country,
      locality: Location.locality,
      roundDate: {
        date: round.date,
        time: round.time || null
      }
    }
  },
  getResult: () => (races.value ? races.value[state.raceSelected].Results : [])
}))

watch(
  computed(() => useStore().getSeason), () => selectRace(0)
)
</script>

<style scoped>
.races-content {
  display: flex;
  flex-direction: column;
  row-gap: 14px;
}

.races-content,
.circuit-content {
  width: 100%;
}

.circuit-content {
  display: flex;
  justify-content: space-between;
}
</style>
