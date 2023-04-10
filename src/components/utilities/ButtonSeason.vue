<template>
  <button type="button" @click="click">
    {{ year }}
  </button>
</template>

<script setup>
defineProps({
  click: Function,
  year: String,
});
</script>

<style scoped>
button {
  background-color: var(--light);
  border: 1px solid var(--light-medium);
  border-radius: 8px;
  padding: 4px 10px;
  font-size: 0.8em;
  color: var(--primary);
  transition: all 0.2s ease;
}

button:hover {
  background-color: var(--primary);
  color: #fff;
  border-color: transparent;
}
</style>
