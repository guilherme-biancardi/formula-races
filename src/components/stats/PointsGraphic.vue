<template>
  <GraphicComponent
    :isLoading="isLoading"
    :title="'Points earned during the season:'"
    :index="index"
    @selectGraphic="selectGraphic"
  >
    <line-chart
      class="graphic"
      :data="data"
      :colors="['#e10600', `${isDarkTheme ? '#e0e0e0' : '#3a3a3a'}`]"
      :max="max"
      :min="0"
      ytitle="Points"
      xtitle="Races"
      width="100%"
      height="100%"
      :dataset="{ borderWidth: 2.5 }"
      :library="{
        scales: {
          x: colorAxis,
          y: colorAxis
        }
      }"
    ></line-chart>
  </GraphicComponent>
</template>

<script setup>
import { useStore } from '@/store/store'
import { useThemeStore } from '@/store/theme'
import { computed } from 'vue'
import GraphicComponent from './GraphicComponent.vue'

const store = useStore()
const themeStore = useThemeStore()

defineProps({
  isLoading: Boolean,
  index: Number,
  data: Object
})

const emit = defineEmits(['selectGraphic'])

const selectGraphic = (index) => emit('selectGraphic', index)

const max = computed(() => store.getMaxPoints)

const isDarkTheme = computed(() => themeStore.getTheme)
const colorAxis = computed(() => ({
  title: { color: `${isDarkTheme.value ? '#ccc' : '#111'}` }
}))
</script>
