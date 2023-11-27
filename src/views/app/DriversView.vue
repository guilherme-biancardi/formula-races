<template>
  <TableComponent :headers="state.headers" :table-style="css.driversTable">
    <ul
      class="table-body"
      v-for="(driver, index) in driverInformation"
      :key="index"
      :style="{ gridTemplateColumns: css.driversTable }"
    >
      <li>{{ driver.position }}</li>
      <li>
        {{ driver.givenName }}&nbsp;<span class="driver-name">{{ driver.familyName }}</span>
      </li>
      <li class="driver-team">{{ driver.teams }}</li>
      <li>{{ driver.points }}</li>
      <li class="driver-link">
        <a :href="driver.url" :title="`Acessar ${driver.familyName}`">
          <IconComponent :path="mdiOpenInNew" :size="17"></IconComponent>
        </a>
      </li>
    </ul>
  </TableComponent>
</template>

<script setup lang="ts">
import IconComponent from '@/components/utils/IconComponent.vue';
import TableComponent from '@/components/utils/TableComponent.vue';
import { useFormulaStore } from '@/stores/formulaStore';
import { mdiOpenInNew } from '@mdi/js';
import { computed, shallowReactive, useCssModule } from 'vue';

const css = useCssModule() as { driversTable: string };

interface DriversState {
  headers: string[];
}

const state = shallowReactive<DriversState>({
  headers: ['position', 'driver', 'team', 'points']
});

const formulaStore = useFormulaStore();

const driverInformation = computed(() =>
  formulaStore.getDrivers.map(({ Driver, Constructors, position, points }) => ({
    givenName: Driver.givenName,
    familyName: Driver.familyName,
    teams: Constructors.map((constructor) => constructor.name).join(', '),
    url: Driver.url,
    position,
    points
  }))
);
</script>

<style module>
:export {
  driversTable: 1fr 2.5fr 2fr 1fr 0.5fr;
}
</style>

<style scoped>
.driver-name {
  font-family: var(--font-bold);
  font-weight: 600;
}

.driver-team {
  font-size: 0.9em !important;
}

.driver-link a {
  transition: all 0.2s ease;
}

.driver-link a:hover {
  color: var(--primary);
}
</style>
