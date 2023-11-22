<template>
  <SkeletonComponent :radius="0"></SkeletonComponent>
  <section>
    <div class="main-skeleton-header">
      <SkeletonComponent :width="300"></SkeletonComponent>
      <SkeletonComponent :width="120"></SkeletonComponent>
    </div>
    <SkeletonComponent></SkeletonComponent>
  </section>
</template>

<script setup lang="ts">
import SkeletonComponent from '../utils/SkeletonComponent.vue';
import '@/assets/contents/appContent.css';
</script>

<style scoped>
.main-skeleton-header {
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
}
</style>
