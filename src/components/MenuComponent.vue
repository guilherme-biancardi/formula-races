<template>
  <nav class="menu-nav">
    <menu>
      <template v-for="(item, index) in items" :key="index">
        <MenuItemComponent :item="item" :icon-size="36"></MenuItemComponent>
      </template>
    </menu>
    <ButtonTheme></ButtonTheme>
  </nav>
</template>

<script setup lang="ts">
import { PhFlagCheckered, PhPresentationChart, PhRanking } from '@phosphor-icons/vue';
import ButtonTheme from './ButtonTheme.vue';
import { useGlobal } from '@/ts/composables/global';
import type { MenuItem } from './util/MenuItemComponent.vue';
import MenuItemComponent from './util/MenuItemComponent.vue';

const { colors } = useGlobal();

const items: MenuItem[] = [
  {
    icon: {
      path: PhRanking
    },
    route: 'standings'
  },
  {
    icon: {
      path: PhFlagCheckered
    },
    route: 'races'
  },
  {
    icon: {
      path: PhPresentationChart
    },
    route: 'stats'
  }
];
</script>

<style scoped>
.menu-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: v-bind('colors?.background');
  border-right: 1px solid v-bind('colors?.darkBackground');
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  padding: 20px 10px;
}

.menu-nav menu {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
</style>
