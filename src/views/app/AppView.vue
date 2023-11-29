<template>
  <MenuBar></MenuBar>
  <section>
    <SearchSeason></SearchSeason>
    <RouterView v-slot="{ Component }" name="app">
      <Transition name="view" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
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

<style scoped>
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
