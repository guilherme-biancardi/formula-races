<template>
  <div class="race-content">
    <RaceInformation :race="raceInformation"></RaceInformation>
    <SelectComponent :values="raceNames" @select="selectRace"></SelectComponent>
  </div>
  <TableComponent
    :headers="['posicao', 'piloto', 'equipe', 'pontos ganhos', 'status']"
    :table-style="$style.table"
    :max-rows="9"
  >
    <ul
      class="table-body"
      v-for="(
        { position, points, status, Driver, Constructor }, index
      ) in race.Results"
      :key="index"
      :style="{ gridTemplateColumns: $style.table }"
    >
      <li>{{ position }}</li>
      <li>
        {{ Driver.givenName }} <span>{{ Driver.familyName }}</span>
      </li>
      <li>{{ Constructor.name }}</li>
      <li>{{ points }}</li>
      <li>{{ status }}</li>
    </ul>
  </TableComponent>
</template>

<script setup>
import { computed, reactive } from "vue";
import SelectComponent from "../components/utilities/SelectComponent.vue";
import { useFormulaStore } from "../stores/formulaStore";
import RaceInformation from "../components/utilities/RaceInformation.vue";
import TableComponent from "../components/utilities/TableComponent.vue";

const formulaStore = useFormulaStore();

const state = reactive({
  raceSelected: 0,
});

const selectRace = (index) => (state.raceSelected = index);

const races = computed(() => formulaStore.getRaces);
const raceNames = computed(() => races.value?.map((race) => race.raceName));
const race = computed(() => races.value.at(state.raceSelected));

const raceInformation = computed(() => {
  const { date, time, Circuit } = race.value;
  const { country, locality } = Circuit.Location;
  return {
    date,
    time,
    circuitName: Circuit.circuitName,
    country,
    locality,
  };
});
</script>

<style module>
:export {
  table: repeat(5, 1fr);
}
</style>

<style scoped>
.race-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
