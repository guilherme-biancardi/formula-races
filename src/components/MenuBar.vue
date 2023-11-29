<template>
  <nav class="menu-content">
    <menu class="menu-list">
      <li v-for="(item, index) in state.menuItems" :key="index" class="menu-item">
        <RouterLink
          :to="{ name: item.name }"
          :class="{ 'item-selected': route.name === item.name }"
          :aria-label="item.label"
        >
          <IconComponent :="item.icon"></IconComponent>
        </RouterLink>
        <span class="menu-tooltip">{{ item.label }}</span>
      </li>
      <li class="menu-item">
        <button aria-label="Change Theme" @click="appStore.toggleTheme">
          <IconComponent :="{ path: themeIcon, size: 28 }"></IconComponent>
        </button>
        <span class="menu-tooltip">Change Theme</span>
      </li>
    </menu>
  </nav>
</template>

<script setup lang="ts">
import { computed, shallowReactive } from 'vue';
import { useRoute } from 'vue-router';
import { mdiRacingHelmet, mdiTools, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import IconComponent, { type Icon } from './utils/IconComponent.vue';
import { useAppStore } from '@/stores/appStore';

const route = useRoute();
const appStore = useAppStore();

const themeIcon = computed(() => (appStore.theme ? mdiWeatherNight : mdiWeatherSunny));

interface MenuItem {
  label: string;
  name: string;
  icon: Icon;
}

interface MenuState {
  menuItems: MenuItem[];
}

const state = shallowReactive<MenuState>({
  menuItems: [
    {
      label: 'Drivers',
      name: 'drivers',
      icon: {
        path: mdiRacingHelmet,
        size: 28
      }
    },
    {
      label: 'Teams',
      name: 'teams',
      icon: {
        path: mdiTools,
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
  padding: 24px 8px;
}

.menu-list {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  row-gap: 10px;
}

.menu-item {
  display: grid;
  place-items: center;
}

.menu-item a {
  padding: 10px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  color: var(--text);
}

:is(.menu-item:hover a, .item-selected) {
  background-color: var(--primary);
  color: #fff;
}

.menu-item:hover .menu-tooltip {
  opacity: 1;
  transform: translateX(10px);
}

.menu-item:last-of-type {
  margin-top: auto;
}

.menu-item:last-of-type button {
  transition: all 0.4s ease;
  color: var(--text);
}

.menu-item:last-of-type:hover button {
  color: var(--primary);
}

.menu-tooltip {
  width: max-content;
  opacity: 0;
  position: absolute;
  padding: 5px 16px;
  left: calc(100% + 8px);
  background-color: var(--primary);
  border-radius: 4px;
  color: #fff;
  font-size: 0.9em;
  transition: all 0.2s ease;
}
</style>
