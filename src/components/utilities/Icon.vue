<template>
  <i class="mdi" :class="name"></i>
</template>

<script>
export default {
  props: {
    name: String
  },
};
</script>

<style scoped>
@import url("../../../node_modules/@mdi/font/css/materialdesignicons.min.css");
</style>