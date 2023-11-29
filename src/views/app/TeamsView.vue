<template>
  <TableComponent :headers="state.headers" :table-style="css.teamsTable">
    <ul
      class="table-body"
      v-for="(team, index) in teamInformation"
      :key="index"
      :style="{ gridTemplateColumns: css.teamsTable }"
    >
      <li>{{ team.position }}</li>
      <li class="team-name">
        <p>{{ team.name }}</p>
        &nbsp;<span>{{ team.nationality }}</span>
      </li>
      <li>{{ team.wins }}</li>
      <li>{{ team.points }}</li>
      <li class="team-link">
        <a :href="team.url" :title="`Acessar ${team.name}`">
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

const css = useCssModule() as { teamsTable: string };

interface TeamsState {
  headers: string[];
}

const state = shallowReactive<TeamsState>({
  headers: ['position', 'team', 'wins', 'points']
});

const formulaStore = useFormulaStore();

const teamInformation = computed(() =>
  formulaStore.getTeams.map(({ Constructor, position, points, wins }) => ({
    name: Constructor.name,
    nationality: Constructor.nationality,
    url: Constructor.url,
    position,
    points,
    wins
  }))
);
</script>

<style module>
:export {
  teamsTable: 1fr 2.5fr 2fr 1fr 0.5fr;
}
</style>

<style scoped>
.team-name p{
  font-family: var(--font-bold);
  font-weight: 600;
}

.team-name span {
  font-size: 0.85em;
  color: var(--text-medium);
}

.team-link a {
  transition: all 0.2s ease;
}

.team-link a:hover {
  color: var(--primary);
}
</style>
