<template>
  <div class="search-skeleton">
    <div class="search-skeleton-content">
      <SkeletonComponent :width="60" :height="25"></SkeletonComponent>
      <SkeletonComponent
        :width="300"
        :height="45"
        :radius="12"
      ></SkeletonComponent>
      <SkeletonComponent :width="60" :height="25"></SkeletonComponent>
    </div>
    <SkeletonComponent :width="115" :height="35"></SkeletonComponent>
  </div>
</template>

<script setup>
import SkeletonComponent from "../utilities/SkeletonComponent.vue";
</script>

<style scoped>
.search-skeleton {
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
}

.search-skeleton-content {
  display: flex;
  align-items: center;
  column-gap: 12px;
}
</style>
