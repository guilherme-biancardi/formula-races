<template>
  <div class="driver-race-stat">
    <div class="stat-header">
      <h2>{{ driverName }}</h2>
      <PageSelectionComponent
        :pages="pages"
        @select-page="setDriverSelected"
      ></PageSelectionComponent>
    </div>
    <ul class="stat-list">
      <li v-for="(stat, index) in raceStat" :key="index" class="stat">
        <div class="stat-text">
          <p>{{ stat.title }}</p>
          <a :href="stat.link" v-if="stat.link" target="_blank">{{
            stat.text
          }}</a>
          <h2 v-else>{{ stat.text }}</h2>
        </div>

        <IconComponent
          :path="stat.icon"
          class="stat-icon"
          :size="26"
        ></IconComponent>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import PageSelectionComponent from "../utilities/PageSelectionComponent.vue";
import { useFormulaStore } from "../../stores/formulaStore";
import IconComponent from "../utilities/IconComponent.vue";
import {
  mdiCheck,
  mdiCheckerboard,
  mdiLink,
  mdiPodium,
  mdiTimerOutline,
} from "@mdi/js";

const formulaStore = useFormulaStore();

const emit = defineEmits(["setDriverSelected"]);
const setDriverSelected = (index) => emit("setDriverSelected", index);

const props = defineProps({
  driversSelected: Array,
  raceSelected: Number,
  driverSelected: Number,
});

const pages = computed(
  () => props.driversSelected.filter((value) => value !== null).length
);

const driverIndex = computed(() =>
  props.driversSelected.at(props.driverSelected)
);

const driverName = computed(
  () => formulaStore.getDriverByIndex(driverIndex.value).name
);

const driverSelected = computed(() =>
  formulaStore.getDriverResult(driverIndex.value)
);

const raceStat = computed(() => {
  if (driverSelected.value) {
    const { Results, raceName, url } = driverSelected.value[props.raceSelected];
    const [{ grid, position, status, FastestLap }] = Results;

    return [
      {
        title: "starting grid",
        text: grid,
        icon: mdiCheckerboard,
      },
      {
        title: "fastest lap",
        text: FastestLap?.Time?.time ?? "---",
        icon: mdiTimerOutline,
      },
      {
        title: "position",
        text: position,
        icon: mdiPodium,
      },
      {
        title: "status",
        text: status,
        icon: mdiCheck,
      },
      {
        title: "race information",
        link: url,
        text: raceName,
        icon: mdiLink,
      },
    ];
  }

  return [];
});
</script>

<style scoped>
.light .driver-race-stat {
  --title: #555;
}

.dark .driver-race-stat {
  --title: #bbb;
}

.driver-race-stat {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-header h2 {
  font-size: 0.9em;
  font-weight: 400;
  text-transform: capitalize;
}

.stat-list {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}

.stat {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background-color: var(--light);
  border-radius: 6px;
  border: 1px solid var(--light-medium);
}

.stat p {
  font-size: 0.85em;
  text-transform: capitalize;
  color: var(--title);
}

.stat-text {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}

.stat-text a {
  text-transform: lowercase;
  font-size: 0.7em;
  text-decoration: underline;
}

.stat-text h2 {
  font-size: 1.1em;
  font-weight: 400;
}

.stat-icon {
  color: var(--primary);
}
</style>
