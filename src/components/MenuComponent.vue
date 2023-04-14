<template>
  <nav>
    <ul class="menu-list">
      <li
        v-for="(item, index) in state.menuItems"
        :key="index"
        :class="{ selected: currentRoute === item.route }"
        class="menu-item"
      >
        <RouterLink :to="item.route">
          <IconComponent :path="item.icon"></IconComponent>
        </RouterLink>
        <p class="menu-tooltip">{{ item.tooltip }}</p>
      </li>
    </ul>
    <button
      class="btn-settings"
      @click="state.isDarkTheme = !state.isDarkTheme"
    >
      <IconComponent :path="themeIcon" :size="28"></IconComponent>
    </button>
  </nav>
</template>

<script setup>
import {
  mdiChartBoxOutline,
  mdiFlagCheckered,
  mdiRacingHelmet,
  mdiTools,
  mdiWeatherNight,
  mdiWeatherSunny,
} from "@mdi/js";
import { computed, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import IconComponent from "./utilities/IconComponent.vue";
import { useAppStore } from "../stores/appStore";

const appStore = useAppStore();
const language = computed(() => appStore.getLanguageFile);

const themeIcon = computed(() => {
  const icons = {
    light: mdiWeatherNight,
    dark: mdiWeatherSunny,
  };

  return icons[appStore.getTheme];
});

const route = useRoute();
const currentRoute = computed(() => route.name);

const state = reactive({
  isDarkTheme: appStore.getTheme === "dark",
  menuItems: [
    {
      icon: mdiRacingHelmet,
      route: "drivers",
      tooltip: "",
    },
    {
      icon: mdiTools,
      route: "teams",
      tooltip: "",
    },
    {
      icon: mdiFlagCheckered,
      route: "races",
      tooltip: "",
    },
    {
      icon: mdiChartBoxOutline,
      route: "graphics",
      tooltip: "",
    },
  ],
});

watch(
  () => state.isDarkTheme,
  (isDark) => appStore.setTheme(isDark ? "dark" : "light")
);

watch(
  language,
  (lang) =>
    state.menuItems.forEach(
      (item, index) => (item.tooltip = lang?.menuTooltips.at(index))
    ),
  { immediate: true }
);
</script>

<style scoped>
nav,
.menu-list,
.menu-list li a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

nav {
  position: relative;
  width: 70px;
  padding: 20px 10px;
  position: fixed;
  left: 0;
  height: 100vh;
  justify-content: space-between;
  background-color: var(--light);
  border-right: 1px solid var(--light-medium);
}

.menu-list {
  row-gap: 14px;
}

.menu-item {
  display: flex;
  align-items: center;
}

.menu-item a {
  padding: 10px 12px;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.selected a,
.menu-item a:hover {
  background-color: var(--primary);
  color: #fff;
}

.menu-item a:hover ~ .menu-tooltip {
  opacity: 1;
}

.menu-tooltip {
  opacity: 0;
  position: absolute;
  left: 100%;
  margin-left: 6px;
  background-color: var(--primary);
  color: #fff;
  padding: 6px 16px;
  box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 0.85em;
  min-width: 125px;
  text-align: center;
  text-transform: capitalize;
  transition: all 0.1s ease;
  z-index: 1;
}

.btn-settings {
  color: var(--text);
  transition: all 0.2s ease;
}

.btn-settings:hover {
  color: var(--primary);
}
</style>
