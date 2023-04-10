<template>
  <MenuComponent></MenuComponent>
  <section>
    <SearchComponent></SearchComponent>
    <RouterView v-slot="{ Component }" name="app">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </section>
</template>

<script setup>
import MenuComponent from "./MenuComponent.vue";
import SearchComponent from "./SearchComponent.vue";
import { useFormulaStore } from "../stores/formulaStore";
import { useAppStore } from "../stores/appStore";

const appStore = useAppStore();
const formulaStore = useFormulaStore();

// verifica se há um tema na store app, caso não seta o tema padrão
await appStore.setTheme(appStore.getTheme || import.meta.env.VITE_APP_THEME);

await formulaStore.getAll();
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: calc(100% - 70px);
  margin-left: 70px;
  padding: 0 10%;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
