<template>
  <ul
    class="table"
    :class="{ 'shadow-table': headers }"
    :style="`--rows: ${rows}`"
  >
    <ul
      class="table-header"
      :style="`grid-template-columns: var(--columns-${columns})`"
    >
      <li v-for="(header, index) in headers || ['no data']" :key="index">
        {{ header }}
      </li>
    </ul>
    <div class="table-scroll">
      <slot></slot>
    </div>
  </ul>
</template>

<script setup>
defineProps({
  headers: Array,
  rows: Number,
  columns: Number
})
</script>

<style scoped>
.table {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  height: calc(var(--height-table) + 36px);

  --primary: white;
  --table-header: #f7f7f7;
  --border: #f3f3f3;
  --height-table: calc(42px * var(--rows));

  --columns-4: 15% 35% repeat(2, 25%);
  --columns-5: 15% 31% repeat(2, 25%) 4%;
}

.shadow-table {
  box-shadow: var(--shadow);
}

.dark-mode .table {
  --primary: #252525;
  --table-header: #292929;
  --border: #282828;
}

.table-header {
  padding: 8px 12px;
  width: 100%;
  height: 36px;
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: var(--table-header);
  box-shadow: var(--shadow);
}

.table-header li {
  text-transform: capitalize;
  color: var(--red);
  font-size: 0.8em;
  font-family: var(--f1-bold);
  font-weight: 100;
}

.table-scroll {
  max-height: var(--height-table);
  overflow: auto;
  overflow-y: overlay;
}
</style>
