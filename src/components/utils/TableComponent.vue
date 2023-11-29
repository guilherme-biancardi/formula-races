<template>
  <ul class="table-content">
    <ul class="table-header" :style="{ gridTemplateColumns: tableStyle }">
      <li v-for="(header, index) in headers" :key="index">{{ header }}</li>
    </ul>
    <div class="table-scroll">
      <slot></slot>
    </div>
  </ul>
</template>

<script setup lang="ts">
export interface Table {
  headers: string[];
  tableStyle: string;
}

defineProps<Table>();
</script>

<style>
[theme='light'] .table-content {
  --table-item-odd: #f8f8f8;
  --table-border: #ddd;
}

[theme='dark'] .table-content {
  --table-item-odd: #1e1e1e;
  --table-border: #2a2a2a;
}

.table-content {
  width: 100%;
  background-color: var(--light);
  border-radius: 8px;

  --item-height: 42px;
  border: 1px solid var(--table-border);
}

.table-content :is(.table-header, .table-body) {
  width: 100%;
  display: grid;
  place-items: center;
}

.table-content :is(.table-header, .table-body) li {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--item-height);
  text-transform: capitalize;
  font-size: 0.95em;
}

.table-header {
  border-top-width: 0px !important;
}

.table-header li {
  font-size: 0.9em;
  font-weight: 600;
  color: var(--primary);
}

.table-scroll {
  overflow: auto;
  max-height: calc(10 * var(--item-height));
}

.table-body:nth-child(odd){
  background-color: var(--table-item-odd);
}
</style>
