<template>
  <nav class="menu-content">
    <ul class="menu-list">
      <li v-for="(item, index) in state.menuItems" :key="index" class="menu-item">
        <RouterLink
          :to="{ name: item.name }"
          :class="{ 'item-selected': route.name === item.name }"
        >
          <IconComponent :="item.icon"></IconComponent>
        </RouterLink>
        <span class="menu-tooltip">{{ item.label }}</span>
      </li>
      <li class="menu-item" v-if="currentThemeAction">
        <button title="Alterar Tema" @click="appStore.setTheme(currentThemeAction.changeTo)">
          <IconComponent :="currentThemeAction.icon"></IconComponent>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, shallowReactive } from 'vue';
import { useRoute } from 'vue-router';
import { mdiRacingHelmet, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import IconComponent, { type Icon } from './utils/IconComponent.vue';
import { useAppStore, type AppStoreStorage } from '@/stores/appStore';

const route = useRoute();
const appStore = useAppStore();

interface ThemeAction {
  icon: Icon;
  changeTo: 'light' | 'dark';
}

const themeActions = new Map<AppStoreStorage['theme'], ThemeAction>();

themeActions.set('light', {
  icon: {
    path: mdiWeatherNight,
    size: 28
  },
  changeTo: 'dark'
});

themeActions.set('dark', {
  icon: {
    path: mdiWeatherSunny,
    size: 28
  },
  changeTo: 'light'
});

const currentThemeAction = computed(() => themeActions.get(appStore.getTheme));

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
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

.menu-item {
  position: relative;
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
  opacity: 0;
  position: absolute;
  padding: 5px 16px;
  left: calc(100% + 10px);
  background-color: var(--primary);
  border-radius: 4px;
  color: #fff;
  font-size: 0.9em;
  transition: all 0.2s ease;
}
</style>
