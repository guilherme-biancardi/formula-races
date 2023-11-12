<template>
  <main>
    <MenuBar></MenuBar>
    <section>
      <RouterView name="root"></RouterView>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import MenuBar from './components/MenuBar.vue';

</script>

<style scoped>
main{
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: var(--menu-width) calc(100% - var(--menu-width));
}

section{
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
</style>