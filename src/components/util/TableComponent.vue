<template>
  <section class="table">
    <header>
      <span
        v-for="(header, index) in headers"
        :key="index"
        :class="{ 'header-center': header.center }"
        >{{ header.text }}</span
      >
    </header>
    <div class="table-content">
      <ul class="table-item" v-for="(item, index) in items" :key="index">
        <slot :item="item"></slot>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts" generic="T">
import { useGlobal } from '@/ts/composables/global';

export type TableHeader = {
  text: string;
  center?: boolean;
};

const { gridStyle } = defineProps<{
  headers: TableHeader[];
  gridStyle: string;
  items: T[];
}>();

const { colors } = useGlobal();
</script>

<style scoped>
.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;
  background-color: v-bind('colors?.background');
  border: 1px solid v-bind('colors?.midBackground');
  border-radius: 8px;
  overflow: hidden;
  scrollbar-gutter: stable both-edges;
}

header {
  padding: 10px 24px;
}

header span {
  font-weight: 400;
  color: v-bind('colors?.softText');
  font-size: 0.8rem;
  text-transform: capitalize;
}

.table-item {
  padding: 14px 24px;
}

.table-item:last-child {
  border-bottom: none;
}

header,
.table-item {
  display: grid;
  align-items: center;
  grid-template-columns: v-bind('gridStyle');
  border-bottom: 1px solid v-bind('colors?.midBackground');
}

.table-content {
  flex-grow: 1;
  max-height: 100%;
  overflow: auto;
}

.header-center {
  text-align: center;
}
</style>
