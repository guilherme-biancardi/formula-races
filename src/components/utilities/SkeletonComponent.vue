<template>
  <div class="skeleton" :style="style"></div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  width: Number,
  height: Number,
  radius: {
    type: Number,
    default: 8,
  },
});

const style = computed(() => ({
  "--width": props.width ? `${props.width}px` : '100%',
  "--height": props.height ? `${props.height}px` : '100vh',
  "--radius": `${props.radius}px`,
}));
</script>

<style scoped>
.skeleton {
  --width: 0;
  --height: 0;
  --radius: 0;
}

.light .skeleton {
  --background-light: #e0e0e0;
  --background-medium: #ededed;
}

.dark .skeleton {
  --background-light: #2c2c2c;
  --background-medium: #353535;
}

.skeleton {
  width: var(--width);
  height: var(--height);
  background: #eee;
  background: linear-gradient(
    90deg,
    var(--background-light) 12%,
    var(--background-medium) 32%,
    var(--background-light) 43%
  );
  border-radius: var(--radius);
  background-size: 200% 100%;
  animation: 0.9s shine linear infinite;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
