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
.light button {
  --button: #fff;
  --button-border: #ccc;
}

.dark button{
  --button: #1b1b1b;
  --button-border: #282828;
}

button {
  background-color: var(--button);
  border: 1px solid var(--button-border);
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
