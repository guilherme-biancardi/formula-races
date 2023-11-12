<template>
  <SvgIcon type="mdi" :path="path" :size="size ?? 24"></SvgIcon>
</template>

<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';

export interface Icon {
    path: string,
    size?: number
}

defineProps<Icon>()
</script>

<style scoped>
svg{
  display: grid;
  place-items: center;
}
</style>
