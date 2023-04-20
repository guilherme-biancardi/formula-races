<template>
  <div>
    <MenuComponent></MenuComponent>
    <section>
      <SearchComponent></SearchComponent>
      <RouterView v-slot="{ Component }" name="app">
        <Transition name="view" mode="out-in">
            <component :is="Component" />
        </Transition>
      </RouterView>
    </section>
  </div>
</template>

<script setup>
import MenuComponent from "./MenuComponent.vue";
import SearchComponent from "./SearchComponent.vue";
import { useFormulaStore } from "../stores/formulaStore";

const formulaStore = useFormulaStore();
await formulaStore.getAll();
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

section {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: calc(100% - 70px);
  margin-left: 70px;
  padding: 0 10%;
}

.view-enter-active,
.view-leave-active {
  transition: all 0.3s ease;
}
.view-enter-from,
.view-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
