<template>
  <ul class="table">
    <ul class="table-header">
      <li v-for="(header, index) in headers" :key="index">{{ header }}</li>
    </ul>
    <div class="table-scroll">
      <slot></slot>
    </div>
  </ul>
</template>

<script>
export default {
  props: {
    headers: Array,
  },
};
</script>

<style>
.table {
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  min-height: 382px;
}

.table-header{
  background-color: #f7f7f7 !important;
}

.table-header li{
    text-transform: capitalize;
    color: var(--red);
    font-size: 0.82em !important;
}

.table ul {
  padding: 8px 12px;
  width: 100%;
  display: grid;
  grid-template-columns: 15% 35% repeat(2, 25%);
  justify-items: center;
  background-color: white;
  border-bottom: 1px solid #f3f3f3;
}

.table ul li{
    font-size: 0.9em;
}

.table-scroll {
  max-height: 350px;
  overflow: auto;
  overflow-y: overlay;
}

span{
    font-family: var(--f1-bold);
}
</style>