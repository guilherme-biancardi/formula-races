<template>
  <div class="standings-content">
    <nav>
      <menu class="standings-menu">
        <template v-for="(item, index) in items" :key="index">
          <MenuItemComponent :item="item">
            <p>{{ item.text }}</p>
          </MenuItemComponent>
        </template>
      </menu>
    </nav>
    <RouterView v-slot="{ Component }" name="standings" style="align-self: center;">
      <AppTransition name="slide-x" mode="out-in">
        <component :is="Component"></component>
      </AppTransition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import AppTransition from '@/components/util/AppTransition.vue';
import type { MenuItem } from '@/components/util/MenuItemComponent.vue';
import MenuItemComponent from '@/components/util/MenuItemComponent.vue';
import { PhSteeringWheel, PhWrench } from '@phosphor-icons/vue';

interface StandingsMenuItem extends MenuItem {
  text: string;
}

const items: StandingsMenuItem[] = [
  {
    icon: {
      path: PhSteeringWheel
    },
    route: 'driversStandings',
    text: 'pilotos'
  },
  {
    icon: {
      path: PhWrench
    },
    route: 'teamsStandings',
    text: 'construtores'
  }
];
</script>

<style scoped>
.standings-content {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  height: 100%;
  overflow: hidden;
}

.standings-content nav {
  width: max-content;
}

.standings-menu {
  display: flex;
  column-gap: 8px;
}

.standings-menu > *{
  width: max-content;
  min-width: 160px;
}

.standings-menu p{
  font-size: 0.9rem;
  text-transform: capitalize;
}
</style>
