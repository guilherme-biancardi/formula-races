<template>
  <Suspense :key="state.reload">
    <MainContent></MainContent>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script setup>
import { reactive, watch } from "vue";
import MainContent from "./components/MainContent.vue";
import { useFormulaStore } from "./stores/formulaStore";

const formulaStore = useFormulaStore();

const state = reactive({
  reload: 0,
});

const setReload = () => state.reload++;

watch(() => formulaStore.getSeason, setReload);
</script>

<style scoped></style>
