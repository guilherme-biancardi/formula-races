<template>
  <Transition name="fade">
    <Suspense :key="appStore.getSeason">
      <main>
        <RouterView name="root"></RouterView>
      </main>

      <template #fallback>
        <main>
          <MainSkeleton></MainSkeleton>
        </main>
      </template>
    </Suspense>
  </Transition>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainSkeleton from './components/skeletons/MainSkeleton.vue';
import { useAppStore } from './stores/appStore';

const appStore = useAppStore();
</script>

<style scoped>
main {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: var(--menu-width) calc(100% - var(--menu-width));
}
</style>
