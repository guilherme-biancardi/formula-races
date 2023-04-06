<template>
  <SvgIcon
    type="mdi"
    :path="path"
    :size="size"
    :style="{ color }"
  ></SvgIcon>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";

defineProps({
  path: String,
  size: Number,
  color: String,
});
</script>

<style scoped></style>
