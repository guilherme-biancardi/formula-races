<template>
  <MenuComponent></MenuComponent>
  <section>
    <SearchComponent></SearchComponent>
    <RouterView name="app"></RouterView>
  </section>
</template>

<script setup>
import MenuComponent from "./MenuComponent.vue";
import SearchComponent from "./SearchComponent.vue";
import { useFormulaStore } from "../stores/formulaStore";

const formulaStore = useFormulaStore();
await formulaStore.getAll()
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
</style>
