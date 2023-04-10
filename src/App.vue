<template>
  <Suspense :key="formulaStore.getSeason">
    <MainContent></MainContent>

    <template #fallback>
      <LoadingComponent></LoadingComponent>
    </template>
  </Suspense>
</template>

<script setup>
import MainContent from "./components/MainContent.vue";
import LoadingComponent from "./components/utilities/LoadingComponent.vue";
import { useFormulaStore } from "./stores/formulaStore";

const formulaStore = useFormulaStore();
</script>

<style scoped>
</style>
