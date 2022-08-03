<template>
  <GraphicComponent
    :title="'Other season statistics:'"
    :isLoading="isLoading"
    :index="index"
    @selectGraphic="selectGraphic"
  >
    <column-chart
      class="graphic"
      :data="state.driversStats"
      :colors="['#e10600', `${isDarkTheme ? '#e0e0e0' : '#3a3a3a'}`]"
      :min="0"
      :max="maxRounds"
      width="100%"
      height="100%"
      xtitle="Statistics"
      :dataset="{ borderWidth: 2.5, color: '#fff' }"
      :library="{
        scales: {
          x: colorAxis,
          y: colorAxis
        }
      }"
    ></column-chart>
  </GraphicComponent>
</template>

<script setup>
import { useStore } from '@/store/store'
import { useThemeStore } from '@/store/theme'
import { computed, reactive, watch } from 'vue'
import GraphicComponent from './GraphicComponent.vue'

const themeStore = useThemeStore()
const store = useStore()

const props = defineProps({
  isLoading: Boolean,
  index: Number,
  results: Array,
  driversName: Array
})

const emit = defineEmits(['selectGraphic'])

const state = reactive({
  driversStats: []
})

const isDarkTheme = computed(() => themeStore.getTheme)
const colorAxis = computed(() => ({
  title: { color: `${isDarkTheme.value ? '#ccc' : '#111'}` }
}))
const season = computed(() => store.getSeason)
const drivers = computed(() => props.driversName)
const maxRounds = computed(() => props.results[0].length)

const selectGraphic = (index) => emit('selectGraphic', index)

const setStat = (index, stat) => state.driversStats[index].data[stat]++

const generateGraphic = (array) =>
  array.forEach((driver, index) => {
    state.driversStats[index] = {
      name: props.driversName[index].name,
      data: { 'Pole Positions': 0, Wins: 0, DNFs: 0, 'Fastest Laps': 0 }
    }
    driver.forEach(({ grid, position, status, FastestLap, ...teste }) => {
      if (grid === '1') setStat(index, 'Pole Positions')
      if (position === '1') setStat(index, 'Wins')
      if (status !== 'Finished' && !status.match('Lap')) setStat(index, 'DNFs')
      if (FastestLap?.rank === '1') setStat(index, 'Fastest Laps')
      if (!FastestLap) delete state.driversStats[index].data['Fastest Laps']
    })
  })

generateGraphic(props.results)

watch(season, () => (state.driversStats = []))
watch(drivers, () => {
  state.driversStats = []
  generateGraphic(props.results)
})

watch(
  computed(() => props.results),
  (results) => generateGraphic(results),
  { deep: true }
)
</script>
