<template>
  <button type="button" @click="click" class="button-season">
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
.button-season {
  background-color: var(--input);
  border: 1px solid var(--input-border);
  border-radius: 8px;
  padding: 4px 10px;
  font-size: 0.8em;
  color: var(--primary);
  transition: all 0.2s ease;
}

.button-season:hover {
  background-color: var(--primary);
  color: #fff;
  border-color: #ff0000;
}
</style>
