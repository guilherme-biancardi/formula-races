<template>
  <MenuBar></MenuBar>
  <section>
    <SearchSeason></SearchSeason>
    <RouterView name="app" class="app-content"></RouterView>
  </section>
</template>

<script setup lang="ts">
import MenuBar from '@/components/MenuBar.vue';
import SearchSeason from '@/components/utils/SearchSeason.vue';
import { useFormulaStore } from '@/stores/formulaStore';
import { RouterView } from 'vue-router';
import '@/assets/contents/appContent.css';

const formulaStore = useFormulaStore();
await formulaStore.requestAll();
</script>

<style scoped></style>
