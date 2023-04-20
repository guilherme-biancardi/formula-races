<template>
  <div class="graphic-view">
    <div class="select-header">
      <DriversSelect
        :drivers-selected="state.driversSelected"
        @select-driver="selectDriver"
        @add-driver="addDriver"
        @delete-driver="deleteDriver"
      ></DriversSelect>
      <SelectComponent
        name="races"
        :values="raceNames"
        @select="selectRace"
      ></SelectComponent>
    </div>

    <Transition name="fade">
      <Suspense :key="state.render">
        <div class="graphic-grid">
          <GraphicContent
            :drivers-selected="state.driversSelected"
            :race-selected="state.raceSelected"
            :driver-selected="state.driverSelected"
            @set-driver-selected="setDriverSelected"
          ></GraphicContent>
        </div>

        <template #fallback>
          <div class="graphic-grid">
            <SkeletonComponent :height="450"></SkeletonComponent>
            <SkeletonComponent :height="450"></SkeletonComponent>
          </div>
        </template>
      </Suspense>
    </Transition>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from "vue";
import DriversSelect from "../components/graphics/DriversSelect.vue";
import SelectComponent from "../components/utilities/SelectComponent.vue";
import { useFormulaStore } from "../stores/formulaStore";
import GraphicContent from "../components/graphics/GraphicContent.vue";
import SkeletonComponent from "../components/utilities/SkeletonComponent.vue";

const formulaStore = useFormulaStore();

const state = reactive({
  driverSelected: 0,
  driversSelected: [0],
  render: 0,
  raceSelected: 0,
});

const raceNames = computed(() => {
  const driverResults = formulaStore.getDriverResult(
    state.driversSelected.at(state.driverSelected)
  );

  if (driverResults) {
    return driverResults.map(({ raceName }) => raceName);
  }

  return [];
});

const selectDriver = (index, value) => (state.driversSelected[index] = value);
const addDriver = () => state.driversSelected.push(null);
const deleteDriver = () => state.driversSelected.pop();

const selectRace = (index) => (state.raceSelected = index);
const renderGraphics = () => state.render++;

const setDriverSelected = (index) => (state.driverSelected = index);

watch(
  () => state.driversSelected.slice(1),
  (values) => (!values.includes(null) ? renderGraphics() : null)
);

watch(() => state.driversSelected[0], renderGraphics);
</script>

<style scoped>
.graphic-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

.select-header {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.graphic-grid {
  display: grid;
  grid-template-columns: 2.1fr 0.9fr;
  width: 100%;
  min-height: 450px;
  gap: 20px;
}
</style>
