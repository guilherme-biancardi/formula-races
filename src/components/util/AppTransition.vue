<template>
  <Transition :name="name" :mode="mode ?? 'default'">
    <slot></slot>
  </Transition>
</template>

<script setup lang="ts">
import type { TransitionProps } from 'vue';

type AcceptedTranstions = 'slide-x' | 'dropdown' | 'fade';

interface AppTransition {
  name: AcceptedTranstions;
  mode?: TransitionProps['mode'];
}

defineProps<AppTransition>();
</script>

<style scoped>
.slide-x-enter-active,
.slide-x-leave-active {
  transition: all 0.2s ease;
}

.slide-x-enter-from,
.slide-x-leave-to {
  opacity: 0;
  transform: translateX(24px);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
