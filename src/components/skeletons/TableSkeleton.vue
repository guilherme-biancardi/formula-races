<template>
  <SkeletonComponent :height="42 * rows"></SkeletonComponent>
</template>

<script setup>
import SkeletonComponent from "../utilities/SkeletonComponent.vue";

defineProps({
  rows: Number,
});
</script>

<style scoped></style>
