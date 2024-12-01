<template>
  <div class="result-empty">
    <EmptyDataSvg></EmptyDataSvg>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import EmptyDataSvg from '../svg/EmptyDataSvg.vue';

defineProps<{ message: string }>();
</script>

<style scoped>
.result-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 36px;
}

.result-empty > svg {
  width: clamp(0px, 100%, 900px);
  height: max-content;
}

.result-empty p {
  font-size: 1.2em;
}
</style>
