<template>
  <button :class="{ selected: isDarkTheme }" @click="themeStore.setTheme">
    <p>dark mode:</p>
    <MaterialIcon
      :icon="`mdi-toggle-switch${isDarkTheme ? '' : '-off'}`"
    ></MaterialIcon>
  </button>
</template>

<script setup>
import { useThemeStore } from '@/store/theme'
import { computed } from 'vue'
import MaterialIcon from './MaterialIcon.vue'

const themeStore = useThemeStore()

const isDarkTheme = computed(() => themeStore.getTheme)
</script>

<style scoped>
button {
  --primary: white;
}

.dark-mode button {
  --primary: #252525;
}

button {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  column-gap: 5px;
  background-color: var(--primary);
  padding: 1px 12px;
  border-radius: 5px;
  box-shadow: var(--shadow);
}

button > p {
  font-size: 0.9em;
  color: var(--text);
}

button > p::first-letter {
  text-transform: capitalize;
}

button > i {
  color: #bfbfbf;
  font-size: 1.85em;
  cursor: pointer;
}

.selected i {
  color: var(--red);
}
</style>
