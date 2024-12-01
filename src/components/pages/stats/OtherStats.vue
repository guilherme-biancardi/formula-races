<template>
  <ChartContent title="Outras estatistícas">
    <BarChart v-bind="barChartProps" css-classes="chart"></BarChart>
  </ChartContent>
</template>

<script setup lang="ts">
import ChartContent from '@/components/contents/ChartContent.vue';
import { useDataStore } from '@/stores/data';
import type { DriverStat } from '@/stores/stats';
import { useGlobal } from '@/ts/composables/global';
import { Chart, registerables, type ChartData, type ChartOptions } from 'chart.js';
import { BarChart, useBarChart } from 'vue-chart-3';

Chart.register(...registerables);

interface PointsPerRacesChart {
  data: DriverStat[];
}

const { chartColors, chartOpacityColors } = useGlobal();
const dataStore = useDataStore();

const props = defineProps<PointsPerRacesChart>();

const chartData: ChartData<'bar'> = {
  labels: ['Poles Position', 'DNFs', 'Pódios'],
  datasets: props.data.map((driverStats, index) => ({
    label: driverStats.driverName,
    data: [driverStats.poles, driverStats.dnf, driverStats.podiums],
    backgroundColor: chartOpacityColors.value[index],
    borderColor: chartColors[index],
    borderWidth: 2,
    maxBarThickness: 40
  }))
};

const options: ChartOptions = {
  scales: {
    y: {
      beginAtZero: true,
      max: dataStore.getRaces.length
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    easing: 'linear',
    duration: 200
  },
  plugins: {
    legend: {
      display: false
    }
  }
};

const { barChartProps } = useBarChart({
  chartData,
  options
});
</script>

<style scoped>
.chart {
  flex-grow: 1;
  height: 100%;
}
</style>
