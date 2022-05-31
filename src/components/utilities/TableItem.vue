<template>
  <ul class="table-item">
    <slot></slot>
  </ul>
</template>

<style>
.table-item {
  --primary: white;
  --border: #f3f3f3;
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
  grid-template-columns: 15% 35% repeat(2, 25%);
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
</style>
