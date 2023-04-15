<template>
  <Transition name="fade">
    <Suspense :key="formulaStore.getSeason">
      <MainContent></MainContent>

      <template #fallback>
        <div class="skeleton-loading">
          <SkeletonComponent :width="70" :radius="0"></SkeletonComponent>

          <section>
            <SearchSkeleton></SearchSkeleton>
            <TableSkeleton :rows="10"></TableSkeleton>
          </section>
        </div>
      </template>
    </Suspense>
  </Transition>
</template>

<script setup>
import MainContent from "./components/MainContent.vue";
import { useFormulaStore } from "./stores/formulaStore";
import SearchSkeleton from "./components/skeletons/SearchSkeleton.vue";
import TableSkeleton from "./components/skeletons/TableSkeleton.vue";
import SkeletonComponent from "./components/utilities/SkeletonComponent.vue";

const formulaStore = useFormulaStore();
</script>

<style scoped>

.skeleton-loading {
  display: flex;
  align-items: center;
  width: 100%;
}

section {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: calc(100% - 70px);
  margin-left: 70px;
  padding: 0 10%;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .8s ease;
}

.fade-leave-active{
  position: absolute;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
