<template>
  <LoadingComponent v-if="isLoading"></LoadingComponent>
  <div class="graphic-content" v-else>
    <h2>Points earned during the season:</h2>
    <line-chart
      class="graphic"
      :data="data"
      :colors="['#e10600', '#a55eea']"
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
  </div>
</template>

<script setup>
import { useStore } from '@/store/store'
import { useThemeStore } from '@/store/theme'
import { computed } from 'vue'
import LoadingComponent from '../utilities/LoadingComponent.vue'

const store = useStore()
const themeStore = useThemeStore()

defineProps({
  data: Object,
  isLoading: Boolean
})

const max = computed(() => store.getMaxPoints)

const isDarkTheme = computed(() => themeStore.getTheme)
const colorAxis = computed(() => ({
  title: { color: `${isDarkTheme.value ? '#ccc' : '#111'}` }
}))
</script>

<style scoped>
.graphic-content {
  --graphic: #fff;
  --text: var(--red);
}

.dark-mode .graphic-content {
  --graphic: #252525;
  --text: #eee;
}

.graphic-content {
  padding: 16px 24px;
  border-radius: 8px;
  background-color: var(--graphic);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

h2 {
  font-size: 1em;
  color: var(--text);
  font-weight: 100;
}
</style>
