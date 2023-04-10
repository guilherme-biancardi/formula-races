<template>
  <ul class="table" :style="{ '--rows': maxRows }">
    <ul class="table-header" :style="{ gridTemplateColumns: tableStyle }">
      <li v-for="(header, index) in headers" :key="index">{{ header }}</li>
    </ul>
    <div class="table-scroll">
      <slot></slot>
    </div>
  </ul>
</template>

<script setup>
defineProps({
  tableStyle: String,
  headers: Array,
  maxRows: Number,
});
</script>

<style>
.table{
  --rows: 0;
}

.light .table {
  --table-background: #fff;
  --table-border: #ddd;
  --table-header: #fafafa;
  --border-item: #f0f0f0;
  
}

.dark .table {
  --table-background: #1b1b1b;
  --table-border: #282828;
  --table-header: #1f1f1f;
  --border-item: #242424;
  --rows: 0;
}

.table {
  background-color: var(--table-background);
  border-radius: 10px;
  border: 1px solid var(--table-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-header,
.table-body {
  display: grid;
  place-items: center;
  padding: 10px 12px;
  font-size: 0.9em;
  text-transform: capitalize;
  border-bottom: 1px solid var(--border-item);
}

.table-header {
  background-color: var(--table-header);
  color: var(--primary);
}

.table-body{
  height: 42px;
}

.table-body span {
  font-family: var(--font-bold);
  font-weight: 600;
}

.table-scroll {
  max-height: calc(var(--rows) * 42px);
  overflow: auto;
}

.table-scroll ul:last-child {
  border: none;
}
</style>
