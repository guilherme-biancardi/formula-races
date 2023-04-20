<template>
  <line-chart
    :data="data"
    width="100%"
    height="100%"
    xtitle="Races"
    :colors="colors"
    :min="0"
    :max="maxPoints"
    :dataset="{ borderWidth: 2.5 }"
    :library="{
      scales: {
        x: colorAxis,
        y: colorAxis,
      },
    }"
  ></line-chart>
</template>

<script setup>
import { computed, useCssModule } from "vue";
import { useAppStore } from "../../stores/appStore";
import { getMaxPoints } from "../../utils/formulaRules";
import { useFormulaStore } from "../../stores/formulaStore";

const appStore = useAppStore();
const formulaStore = useFormulaStore();
const css = useCssModule();

const getColor = (name) => css[`${name}-${appStore.getTheme}`];

const colorAxis = computed(() => ({
  title: { color: getColor("title") },
}));

const colors = computed(() => [getColor("primary-wave"), getColor("wave")]);

const maxPoints = computed(() => getMaxPoints(formulaStore.getSeason));

defineProps({
  data: Array,
});
</script>

<style module>
:export {
  wave-dark: #e0e0e0;
  wave-light: #3a3a3a;
  primary-wave-light: #e10600;
  primary-wave-dark: #df332e;
  title-light: #111;
  title-dark: #ccc;
}
</style>
