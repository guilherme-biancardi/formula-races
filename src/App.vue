<template>
  <main>
    <MenuComponent></MenuComponent>
    <AppSection></AppSection>
  </main>
</template>

<script setup lang="ts">
import '@/css/main.css';
import MenuComponent from './components/MenuComponent.vue';
import AppSection from './components/AppSection.vue';
import { useGlobal } from './ts/composables/global';

const { colors, fonts } = useGlobal();
</script>

<style>
* {
  font-family: v-bind('fonts?.fontRegular');
  user-select: none;
}

*::-webkit-scrollbar-track {
  background-color: transparent;
}

*::-webkit-scrollbar {
  width: 3px;
}

*::-webkit-scrollbar-thumb {
  background: v-bind('colors?.primary');
  border-radius: 8px;
}

main {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 72px 1fr;
  overflow: hidden;
  background-color: v-bind('colors?.softBackground');
  color: v-bind('colors?.text');
}

* {
  --vs-input-bg: v-bind('colors?.background');
  --vs-input-outline: v-bind('colors?.primary');
  --vs-input-placeholder-color: v-bind('colors?.softText');
  --vs-border: 1px solid v-bind('colors?.midBackground');

  --vs-menu-bg: v-bind('colors?.background') !important;
  --vs-text-color: v-bind('colors?.text') !important;

  --vs-menu-border: var(--vs-border);
  --vs-menu-bg: v-bind('colors?.background');

  --vs-option-hover-color: v-bind('colors?.primary') !important;
  --vs-option-selected-color: v-bind('colors?.primary') !important;
  --vs-multi-value-text-color: v-bind('colors?.text');

  --vs-option-focused-color: v-bind('colors?.primary');
  --vs-multi-value-gap: 4px;
}
</style>

<style scoped>
:deep(.vue-select .menu-option):hover,
:deep(.vue-select .menu-option.selected),
:deep(.vue-select .menu-option.focused) {
  color: #fff;
}

:deep(.vue-select .control){
 padding: 4px 8px;
 box-shadow: none !important;
 transition: all .2s ease;
}
</style>
