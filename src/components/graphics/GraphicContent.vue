<template>
  <GraphicComponent :drivers-selected="driversSelected"></GraphicComponent>
  <DriverRaceStat
    :drivers-selected="driversSelected"
    :race-selected="raceSelected"
    :driver-selected="driverSelected"
    @set-driver-selected="setDriverSelected"
  ></DriverRaceStat>
</template>

<script setup>
import { useFormulaStore } from "../../stores/formulaStore";
import GraphicComponent from "./GraphicComponent.vue";
import DriverRaceStat from "./DriverRaceStat.vue";

const formulaStore = useFormulaStore();

const emit = defineEmits(["setDriverSelected"]);
const setDriverSelected = (index) => emit("setDriverSelected", index);

const props = defineProps({
  driversSelected: Array,
  raceSelected: Number,
  driverSelected: Number,
});

const renderGraphic = async () => {
  for (let driverIndex of props.driversSelected) {
    if (!formulaStore.getDriverResult(driverIndex)) {
      const driver = formulaStore.getDriverByIndex(driverIndex);
      await formulaStore.setDriverResults(driver.id);
    }
  }
};

await renderGraphic();
</script>

<style scoped></style>
