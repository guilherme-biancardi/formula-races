<template>
  <TableComponent
    :headers="['posicao', 'nome', 'equipe', 'pontos']"
    :table-style="$style.table"
    :max-rows="10"
  >
    <ul
      class="table-body"
      v-for="(
        { position, points, Driver, Constructors }, index
      ) in formulaStore.getDrivers"
      :key="index"
      :style="{ gridTemplateColumns: $style.table }"
    >
      <li>{{ position }}</li>
      <li>
        {{ Driver.givenName }} <span>{{ Driver.familyName }}</span>
      </li>
      <li>{{ Constructors[0].name }}</li>
      <li>{{ points }}</li>
      <li>
        <a :href="Driver.url" target="_blank"
          ><IconComponent :path="mdiOpenInNew" :size="17"></IconComponent
        ></a>
      </li>
    </ul>
  </TableComponent>
</template>

<script setup>
import TableComponent from "../components/utilities/TableComponent.vue";
import IconComponent from "../components/utilities/IconComponent.vue";
import { mdiOpenInNew } from "@mdi/js";
import { useFormulaStore } from "../stores/formulaStore";

const formulaStore = useFormulaStore()
</script>

<style module>
:export {
  table: repeat(4, 1fr) 0.5fr;
}
</style>
