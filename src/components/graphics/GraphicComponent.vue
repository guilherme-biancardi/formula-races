<template>
  <div class="graphic-content">
    <div class="graphic-header">
      <h1>{{ graphic.title }}</h1>
      <PageSelectionComponent
        :pages="state.acceptedGraphics.length"
        @select-page="selectGraphic"
      ></PageSelectionComponent>
    </div>
    <component :is="graphic.component" :data="graphic.data"></component>
  </div>
</template>

<script setup>
import { computed, markRaw, reactive } from "vue";
import { useFormulaStore } from "../../stores/formulaStore";
import SeasonPoints from "./SeasonPoints.vue";
import OtherStats from "./OtherStats.vue";
import PageSelectionComponent from "../utilities/PageSelectionComponent.vue";

const formulaStore = useFormulaStore();

const props = defineProps({
  driversSelected: Array,
});

const state = reactive({
  currentGraphic: 0,
  acceptedGraphics: ["seasonPoints", "otherStats"],
  graphics: {
    seasonPoints: {
      component: markRaw(SeasonPoints),
      data: [],
      title: "Points earned during the season:",
    },
    otherStats: {
      component: markRaw(OtherStats),
      data: [],
      title: "Other season statistics:",
    },
  },
});

const driversResults = computed(() => {
  const driversResults = [];

  props.driversSelected.forEach((driverIndex) => {
    const results = formulaStore.getDriverResult(driverIndex);

    driversResults.push(results);
  });

  return driversResults;
});

const selectGraphic = (index) => (state.currentGraphic = index);

const graphic = computed(() => {
  const graphicName = state.acceptedGraphics.at(state.currentGraphic);

  return state.graphics[graphicName];
});

const setGraphicData = (graphic, index, data) => {
  const driver = formulaStore.getDriverByIndex(props.driversSelected.at(index));
  state.graphics[graphic].data.push({ name: driver.name, data });
};

const createSeasonPointsGraphic = () => {
  driversResults.value.forEach((driverResults, index) => {
    const data = {};

    driverResults.forEach(({ Results, Circuit }) => {
      const [{ points }] = Results;

      const { country } = Circuit.Location;
      data[country] = points;
    });

    setGraphicData("seasonPoints", index, data);
  });
};

const createOtherStatsGraphic = () => {
  driversResults.value.forEach((driverResults, index) => {
    const data = { "Pole Positions": 0, Wins: 0, DNFs: 0 };

    driverResults.forEach(({ Results }, resultIndex) => {
      const [{ grid, position, status, FastestLap }] = Results;

      // adiciona a propiedade de volta mais rápida caso exista o dado
      if (FastestLap && resultIndex === 0) {
        data["Fastest Laps"] = 0;
      }

      // verifica se o piloto largou na primeira posição
      if (grid === "1") data["Pole Positions"]++;

      // verifica se o piloto terminou na primeira posição
      if (position === "1") data.Wins++;

      // verifica se o piloto não terminou a corrida
      if (status !== "Finished" && !status.match("Lap")) data.DNFs++;

      // verifica se o piloto teve a volta mais rápida da corrida
      if (FastestLap) {
        if (FastestLap?.rank === "1") {
          data["Fastest Laps"]++;
        }
      }
    });

    setGraphicData("otherStats", index, data);
  });
};

createSeasonPointsGraphic();
createOtherStatsGraphic();
</script>

<style scoped>
.light .graphic-content {
  --title: #555;
}

.dark .graphic-content {
  --title: #ccc;
}

.graphic-content {
  display: grid;
  grid-template-rows: 0.1fr 1.9fr;
  gap: 12px;
  width: 100%;
  height: 100%;
  padding: 16px;
  background-color: var(--light);
  border: 1px solid var(--light-medium);
  border-radius: 8px;
}

.graphic-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.graphic-header h1 {
  font-size: 1.1em;
  font-weight: 400;
  font-family: var(--font-bold);
  color: var(--title);
}
</style>
