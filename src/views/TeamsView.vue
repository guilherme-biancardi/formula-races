<template>
  <TableComponent
    :headers="language?.headers"
    :table-style="$style.table"
    :max-rows="10"
    v-if="formulaStore.getTeams"
  >
    <ul
      class="table-body"
      v-for="(
        { position, points, wins, Constructor }, index
      ) in formulaStore.getTeams"
      :key="index"
      :style="{ gridTemplateColumns: $style.table }"
    >
      <li>{{ position }}</li>
      <li>
        <span>{{ Constructor.name }}</span>
        <span class="nationality-team">{{ Constructor.nationality }}</span>
      </li>
      <li>{{ wins }}</li>
      <li>{{ points }}</li>
      <li>
        <a :href="Constructor.url" target="_blank"
          ><IconComponent :path="mdiOpenInNew" :size="17"></IconComponent
        ></a>
      </li>
    </ul>
  </TableComponent>
  <p v-else>{{ language?.noDataMessage }}</p>
</template>

<script setup>
import TableComponent from "../components/utilities/TableComponent.vue";
import IconComponent from "../components/utilities/IconComponent.vue";
import { mdiOpenInNew } from "@mdi/js";
import { useFormulaStore } from "../stores/formulaStore";
import { useAppStore } from "../stores/appStore";
import { computed } from "vue";

const formulaStore = useFormulaStore();
const appStore = useAppStore();

const language = computed(() => appStore.getLanguageFile?.teams);
</script>

<style module>
:export {
  table: 1fr 1.3fr repeat(2, 1fr) 0.4fr;
}
</style>

<style scoped>
.nationality-team {
  font-size: 0.6em;
  margin-left: 4px;
  font-weight: 500;
  font-family: var(--font-regular);
  opacity: 0.8;
}
</style>
