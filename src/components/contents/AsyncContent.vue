<template>
  <slot></slot>
</template>

<script setup lang="ts">
interface AsyncContent {
  fetchData: () => Promise<void>;
}

const { fetchData } = defineProps<AsyncContent>();

await fetchData();
</script>

<style scoped></style>
