<template>
  <Suspense :key="formulaStore.getSeason">
    <MainContent></MainContent>

    <template #fallback>
      carregando...
    </template>
  </Suspense>
</template>

<script setup>
import MainContent from "./components/MainContent.vue";
import { useFormulaStore } from "./stores/formulaStore";

const formulaStore = useFormulaStore();
</script>

<style scoped></style>
