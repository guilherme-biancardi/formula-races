<template>
  <TableComponent
    :rows="rows"
    :headers="
      standing.length ? ['position', 'constructor', 'wins', 'points'] : null
    "
  >
    <TableItem
      v-for="({ Constructor, ...item }, index) in standing"
      :key="index"
    >
      <li>
        <span>{{ item.positionText }}</span>
      </li>
      <li>
        {{ Constructor.name }}
        <span class="small">{{ Constructor.nationality }}</span>
      </li>
      <li>{{ item.wins }}</li>
      <li>{{ item.points }}</li>
    </TableItem>
  </TableComponent>
</template>

<script setup>
import TableComponent from '@/components/utilities/TableComponent.vue'
import { useConstructorsStore } from '@/store/constructor'
import { computed } from 'vue'
import TableItem from '@/components/utilities/TableItem.vue'

const constructorStore = useConstructorsStore()
const standing = computed(() => constructorStore.getStanding)
const rows = computed(() => {
  const rows = standing.value.length

  return rows < 10 ? rows : 10
})
</script>
