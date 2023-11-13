<template>
  <div>
    <h1>pilotos</h1>
    {{ formulaStore.getDrivers[0] }}
  </div>
</template>

<script setup lang="ts">
import { useFormulaStore } from '@/stores/formulaStore';

const formulaStore = useFormulaStore()
</script>

<style scoped></style>
