<template>
  <button @click="next()">
    <IconComponent
      :path="icon"
      :options="{
        weight: 'duotone',
        size: 32
      }"
    ></IconComponent>
  </button>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import IconComponent from './util/IconComponent.vue';
import { useAppStore } from '@/stores/app';
import { PhMoon, PhSun } from '@phosphor-icons/vue';
import { useCycleList } from '@vueuse/core';
import { useGlobal } from '@/ts/composables/global';

const appStore = useAppStore();
const { colors } = useGlobal();

const icon = computed(() => (appStore.getTheme === 'dark' ? PhSun : PhMoon));

const { state, next } = useCycleList(['dark', 'light'] as const, {
  initialValue: appStore.getTheme
});

watchEffect(() => appStore.setTheme(state.value));
</script>

<style scoped>
button {
  color: v-bind('colors?.softText');
  transition: all 0.2s ease;
}

button:hover {
  color: v-bind('colors?.primary');
}
</style>
