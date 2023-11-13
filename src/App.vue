<template>
  <main>
    <Suspense>
      <RouterView name="root"></RouterView>
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style scoped>
main {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: var(--menu-width) calc(100% - var(--menu-width));
}
</style>
