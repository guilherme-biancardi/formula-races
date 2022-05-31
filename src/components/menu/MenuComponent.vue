<template>
  <section>
    <NavegationComponent></NavegationComponent>
    <SearchComponent></SearchComponent>
  </section>
</template>

<script setup>
import NavegationComponent from './NavegationComponent.vue'
import SearchComponent from './SearchComponent.vue'
</script>

<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
