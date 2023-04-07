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
      </li>
    </ul>
    <button class="btn-settings">
      <IconComponent :path="mdiCog" :size="28"></IconComponent>
    </button>
  </nav>
</template>

<script setup>
import {
  mdiChartBoxOutline,
  mdiCog,
  mdiFlagCheckered,
  mdiRacingHelmet,
  mdiTools,
} from "@mdi/js";
import { computed, reactive } from "vue";
import { RouterLink, useRoute } from "vue-router";
import IconComponent from "./utilities/IconComponent.vue";

const route = useRoute();

const currentRoute = computed(() => route.name);

const state = reactive({
  menuItems: [
    {
      icon: mdiRacingHelmet,
      route: "drivers",
    },
    {
      icon: mdiTools,
      route: "teams",
    },
    {
      icon: mdiFlagCheckered,
      route: "races",
    },
    {
      icon: mdiChartBoxOutline,
      route: "graphics",
    },
  ],
});
</script>

<style scoped>
.light nav {
  --nav-background: #fff;
  --nav-border: #ddd;
}

.dark nav {
  --nav-background: #1b1b1b;
  --nav-border: #282828;
}

nav,
.menu-list,
.menu-list li a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

nav {
  width: 70px;
  padding: 20px 10px;
  position: fixed;
  left: 0;
  height: 100vh;
  justify-content: space-between;
  background-color: var(--nav-background);
  border-right: 1px solid var(--nav-border);
}

.menu-list {
  row-gap: 14px;
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

.btn-settings{
  color: var(--text);
  transition: all .2s ease;
}

.btn-settings:hover{
  color: var(--primary);
}
</style>
