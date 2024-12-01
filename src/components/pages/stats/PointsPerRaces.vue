<template>
  <ChartContent title="Pontos por corrida">
    <AppTransition name="slide-x" mode="out-in">
      <LineChart :options="options" css-classes="chart" :chart-data="chartData"></LineChart>
    </AppTransition>
  </ChartContent>
</template>

<script setup lang="ts">
import ChartContent from '@/components/contents/ChartContent.vue';
import AppTransition from '@/components/util/AppTransition.vue';
import { useDataStore } from '@/stores/data';
import type { DriverStat } from '@/stores/stats';
import { useGlobal } from '@/ts/composables/global';
import { Chart, registerables, type ChartData, type ChartOptions } from 'chart.js';
import { LineChart } from 'vue-chart-3';

Chart.register(...registerables);

interface PointsPerRacesChart {
  data: DriverStat[];
}

const dataStore = useDataStore();
const { chartOpacityColors, chartColors } = useGlobal();

const props = defineProps<PointsPerRacesChart>();
const chartRaceLabels = dataStore.getRaces.map((race) => race.raceName);

const chartData: ChartData<'line'> = {
  labels: chartRaceLabels,
  datasets: props.data.map((driverStats, index) => ({
    label: driverStats.driverName,
    data: driverStats.pointsPerRaces,
    borderColor: chartColors[index],
    backgroundColor: chartOpacityColors.value[index],
    fill: true,
    tension: 0.1
  }))
};

const options: ChartOptions = {
  scales: {
    y: {
      beginAtZero: true,
      max: 30
    }
  },
  maintainAspectRatio: false,
  animation: {
    easing: 'linear',
    duration: 200
  }
};
</script>

<style scoped>
.chart {
  flex-grow: 1;
  height: 100%;
}
</style>
