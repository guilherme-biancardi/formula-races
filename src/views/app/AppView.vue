<template>
  <MenuBar></MenuBar>
  <section>
    <SearchSeason></SearchSeason>
    <RouterView name="app"></RouterView>
  </section>
</template>

<script setup lang="ts">
import MenuBar from '@/components/MenuBar.vue';
import SearchSeason from '@/components/utils/SearchSeason.vue';
import { useFormulaStore } from '@/stores/formulaStore';
import { RouterView } from 'vue-router';

const formulaStore = useFormulaStore();
await formulaStore.requestAll();
</script>

<style scoped></style>
