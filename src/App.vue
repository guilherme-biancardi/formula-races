<template>
  <Suspense :key="formulaStore.getSeason">
    <MainContent></MainContent>

    <template #fallback> {{ language?.loading }} </template>
  </Suspense>
</template>

<script setup>
import { computed } from "vue";
import MainContent from "./components/MainContent.vue";
import { useAppStore } from "./stores/appStore";
import { useFormulaStore } from "./stores/formulaStore";

const formulaStore = useFormulaStore();
const appStore = useAppStore();

const language = computed(() => appStore.getLanguageFile)
</script>

<style scoped></style>
