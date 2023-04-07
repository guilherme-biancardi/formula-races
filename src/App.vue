<template>
  <MenuComponent></MenuComponent>
  <section>
    <SearchComponent></SearchComponent>
    <RouterView name="app"></RouterView>
  </section>
</template>

<script setup>
import MenuComponent from "./components/MenuComponent.vue";
import SearchComponent from "./components/SearchComponent.vue";
import { RouterView } from "vue-router";
</script>

<style scoped>
.logo {
  position: absolute;
  top: 16px;
  left: 16px;
  max-width: 82px;
}

section {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: calc(100% - 70px);
  margin-left: 70px;
  padding: 0 10%;
}
</style>
