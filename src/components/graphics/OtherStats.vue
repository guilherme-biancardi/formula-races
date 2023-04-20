<template>
  <column-chart
    :stacked="false"
    :data="data"
    :colors="colors"
    :min="0"
    :max="racesLength"
    width="100%"
    height="100%"
    xtitle="Statistics" 
    :dataset="{ borderWidth: 2.5}"
    :library="{
      scales: {
        x: colorAxis,
        y: colorAxis,
      },
    }"
  ></column-chart>
</template>

<script setup>
import { computed, useCssModule } from "vue";
import { useAppStore } from "../../stores/appStore";
import { useFormulaStore } from "../../stores/formulaStore";

const appStore = useAppStore();
const formulaStore = useFormulaStore();
const css = useCssModule();

const getColor = (name) => css[`${name}-${appStore.getTheme}`];

const colorAxis = computed(() => ({
  title: { color: getColor("title") },
}));

const racesLength = computed(() => formulaStore.getRaces.length);

const colors = computed(() => [getColor("primary-column"), getColor("column")]);

defineProps({
  data: Object,
});
</script>

<style module>
:export {
  column-dark: #e0e0e0;
  column-light: #3a3a3a;
  primary-column-light: #e10600;
  primary-column-dark: #df332e;
  title-light: #111;
  title-dark: #ccc;
}
</style>
