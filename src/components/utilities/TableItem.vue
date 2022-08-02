<template>
  <ul
    class="table-item"
    :style="`grid-template-columns: var(--columns-${columns})`"
  >
    <slot></slot>
  </ul>
</template>

<script setup>
defineProps({
  columns: Number
})
</script>

<style>
.table-item {
  --primary: white;
  --border: #f3f3f3;

  --columns-4: 15% 35% repeat(2, 25%);
  --columns-5: 15% 31% repeat(2, 25%) 4%;
}

.dark-mode .table-item {
  --primary: #252525;
  --border: #282828;
}

.table-item {
  padding: 8px 12px;
  width: 100%;
  height: 42px;
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: var(--primary);
  border-bottom: 1px solid var(--border);
}

.table-item li {
  font-size: 0.85em;
}

span {
  font-family: var(--f1-bold);
}

span.small {
  font-size: 0.8em;
  color: #777;
  font-family: var(--f1-regular);
}

a {
  color: var(--red);
  font-size: 1.1em;
}
</style>
