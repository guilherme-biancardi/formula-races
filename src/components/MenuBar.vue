<template>
  <nav class="menu-content">
    <ul class="menu-list">
      <li v-for="(item, index) in state.menuItems" :key="index" class="menu-item">
        <RouterLink :to="item.link">
          <IconComponent :="item.icon"></IconComponent>
        </RouterLink>
        <span class="menu-tooltip">{{ item.label }}</span>
      </li>
      <!-- <li>
        <button>
          <IconComponent></IconComponent>
        </button>
      </li> -->
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { shallowReactive } from 'vue';
import type { RouterLinkProps } from 'vue-router';
import { mdiRacingHelmet } from '@mdi/js';
import IconComponent, { Icon } from './utils/IconComponent.vue';

interface MenuItem {
  label: string;
  link: RouterLinkProps['to'];
  icon: Icon;
}

interface MenuState {
  menuItems: MenuItem[];
}

const state = shallowReactive<MenuState>({
  menuItems: [
    {
      label: 'Drivers',
      link: {
        name: 'drivers'
      },
      icon: {
        path: mdiRacingHelmet,
        size: 28
      }
    }
  ]
});
</script>

<style scoped>
.menu-content {
  width: 100%;
  height: 100%;
  background-color: var(--light);
  padding: 28px 2px;
}

.menu-list {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.menu-item {
  position: relative;
  display: grid;
  place-items: center;
  
}

.menu-item:hover a {
  background-color: var(--primary);
  color: #fff;
}

.menu-item:hover .menu-tooltip{
  opacity: 1;
  transform: translateX(10px);
}

.menu-item a {
  padding: 10px 12px;
  border-radius: 8px;
  transition: all .2s ease;
}

.menu-tooltip {
  opacity: 0;
  position: absolute;
  padding: 5px 16px;
  left: calc(100% + 10px);
  background-color: var(--primary);
  border-radius: 4px;
  color: #fff;
  font-size: 0.9em;
  transition: all .2s ease;
}
</style>
