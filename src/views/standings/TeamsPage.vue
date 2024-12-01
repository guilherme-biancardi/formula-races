<template>
  <TableComponent
    :grid-style="cssModule.gridStyle"
    :headers="tableHeaders"
    :items="dataStore.getConstructorsStandings"
  >
    <template v-slot="{ item }">
      <li class="constructor-text">
        <span class="constructor-name">{{ item.Constructor.name }}</span
        ><span class="constructor-nationality">{{ item.Constructor.nationality }}</span>
      </li>
      <li style="text-align: center">{{ item.wins }}</li>
      <li style="text-align: center">{{ item.points }}</li>
      <li>
        <a :href="item.Constructor.url" class="constructor-link" target="_blank">
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
import { useDataStore } from '@/stores/data';
import { useGlobal } from '@/ts/composables/global';
import { PhLinkSimpleHorizontal } from '@phosphor-icons/vue';
import { useCssModule } from 'vue';

const cssModule = useCssModule() as Record<'gridStyle', string>;
const { colors, fonts } = useGlobal();
const dataStore = useDataStore();

const tableHeaders: TableHeader[] = [
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
</script>

<style module>
:export {
  gridStyle: 1fr repeat(2, 150px) 40px;
}
</style>

<style scoped>
.constructor-text{
  display: flex;
  align-items: center;
  column-gap: 4px;
}

.constructor-name {
  font-family: v-bind('fonts?.fontBold');
}

.constructor-nationality {
  font-size: 0.8rem;
  color: v-bind('colors?.softText');
}

.constructor-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: v-bind('colors?.primary');
}
</style>
