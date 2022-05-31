<template>
  <i class="mdi" :class="icon"></i>
</template>

<script setup>
defineProps({
  icon: String
})
</script>

<style scoped>
@import url('../../../node_modules/@mdi/font/css/materialdesignicons.min.css');
</style>
