<template>
  <div class="chart-content">
    <h3>{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useGlobal } from '@/ts/composables/global';

interface ChartContent {
  title: string;
}

defineProps<ChartContent>();

const { colors, fonts } = useGlobal();
</script>

<style scoped>
.chart-content {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  row-gap: 12px;
  height: 100%;
  overflow: hidden;
}

.chart-content {
  background-color: v-bind('colors?.background');
  border: 1px solid v-bind('colors?.midBackground');
  border-radius: 8px;
  padding: 16px;
}

.chart-content h3 {
  font-family: v-bind('fonts?.fontBold');
}
</style>
