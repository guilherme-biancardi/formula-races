<template>
  <hr />
</template>

<script setup lang="ts">
import { useGlobal } from '@/ts/composables/global';
import { toRef } from 'vue';

const { colors } = useGlobal();

interface Divider {
  color?: string;
  size?: number;
}

const props = withDefaults(defineProps<Divider>(), {
  size: 1
});

const size = toRef(() => `${props.size}px`);
const color = toRef(() => props.color || colors?.midBackground);
</script>

<style scoped>
hr {
  width: 100%;
  height: v-bind('size');
  border: none;
  background-color: v-bind('color');
  align-self: center;
}
</style>
