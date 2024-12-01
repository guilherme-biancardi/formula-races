<template>
  <component :is="path" :="options"></component>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

export interface Icon {
  path: Component;
  options?: {
    weight?: 'bold' | 'fill' | 'thin' | 'light' | 'regular' | 'duotone';
    size?: number | string;
    mirrored?: boolean;
    color?: string;
  };
}

withDefaults(defineProps<Icon>(), {
  options() {
    return {
      size: 24
    };
  }
});
</script>

<style scoped>
* {
  display: grid;
  place-items: center;
}
</style>
