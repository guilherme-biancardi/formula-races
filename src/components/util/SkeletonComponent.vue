<template>
  <div class="skeleton"></div>
</template>

<script setup lang="ts">
import { useGlobal } from '@/ts/composables/global';
import { toRef } from 'vue';

const { colors } = useGlobal();

interface Skeleton {
  width?: number;
  height?: number;
  radius?: number;
}

const props = withDefaults(defineProps<Skeleton>(), {
  radius: 8
});

const width = toRef(() => (props.width ? `${props.width}px` : '100%'));
const height = toRef(() => (props.height ? `${props.height}px` : '100%'));
const radius = toRef(() => `${props.radius}px`);
</script>

<style scoped>
.skeleton {
  width: v-bind(width);
  height: v-bind(height);
  background: linear-gradient(
    90deg,
    v-bind('colors?.midBackground') 12%,
    v-bind('colors?.darkBackground') 32%,
    v-bind('colors?.midBackground') 43%
  );
  border-radius: v-bind(radius);
  background-size: 200% 100%;
  animation: 0.9s shine linear infinite;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
