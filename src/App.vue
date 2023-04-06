<template>
  <img src="./assets/image/formula-1-logo.webp" alt="logotipo da formula 1" class="logo"/>
  <section>
    <SearchComponent></SearchComponent>
  </section>
</template>

<script setup>
import SearchComponent from './components/SearchComponent.vue';

</script>

<style scoped>
.logo{
  position: absolute;
  top: 16px;
  left: 16px;
  max-width: 82px;
}

section{
  width: 60%;
}
</style>
