<template>
  <MenuBar></MenuBar>
  <section>
    <RouterView name="app" class="app-content"></RouterView>
  </section>
</template>

<script setup lang="ts">
import MenuBar from '@/components/MenuBar.vue';
import { useFormulaStore } from '@/stores/formulaStore';
import { RouterView } from 'vue-router';

const formulaStore = useFormulaStore();

await formulaStore.requestAll();
</script>

<style scoped>
section {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.app-content {
  padding: 20px;
}
</style>
