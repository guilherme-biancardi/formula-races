<template>
  <TableComponent
    :grid-style="cssModule.gridStyle"
    :headers="tableHeaders"
    :items="dataStore.getDriversStandings"
  >
    <template v-slot="{ item }">
      <li>
        {{ item.Driver.givenName }} <span class="driver-name">{{ item.Driver.familyName }}</span>
      </li>
      <li class="driver-team">{{ getContructorsByDriverStanding(item.Constructors) }}</li>
      <li style="text-align: center">{{ item.wins }}</li>
      <li style="text-align: center">{{ item.points }}</li>
      <li>
        <a :href="item.Driver.url" class="driver-link" target="_blank">
          <IconComponent
            :path="PhLinkSimpleHorizontal"
            :options="{
              size: 20
            }"
          ></IconComponent>
        </a>
      </li>
    </template>
  </TableComponent>
</template>

<script setup lang="ts">
import IconComponent from '@/components/util/IconComponent.vue';
import type { TableHeader } from '@/components/util/TableComponent.vue';
import TableComponent from '@/components/util/TableComponent.vue';
import type { DriverStanding } from '@/requests/drivers';
import { useDataStore } from '@/stores/data';
import { useGlobal } from '@/ts/composables/global';
import { PhLinkSimpleHorizontal } from '@phosphor-icons/vue';
import { useCssModule } from 'vue';

const cssModule = useCssModule() as Record<'gridStyle', string>;
const { colors, fonts } = useGlobal();
const dataStore = useDataStore();

const tableHeaders: TableHeader[] = [
  {
    text: 'piloto'
  },
  {
    text: 'equipe'
  },
  {
    text: 'vitórias',
    center: true
  },
  {
    text: 'pontos',
    center: true
  }
];

const getContructorsByDriverStanding = (constructors: DriverStanding['Constructors']) =>
  constructors.map((team) => team.name).join(', ');
</script>

<style module>
:export {
  gridStyle: repeat(2, 1fr) repeat(2, 140px) 40px;
}
</style>

<style scoped>
.driver-name {
  font-family: v-bind('fonts?.fontBold');
}

.driver-team {
  font-size: 0.9em;
}

.driver-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: v-bind('colors?.primary');
}
</style>
