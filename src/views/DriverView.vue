<template>
  <TableComponent
    :headers="['position', 'driver', 'team', 'points']"
    :rows="10"
  >
    <TableItem
      v-for="({ Driver, Constructors, ...item }, index) in standing"
      :key="index"
    >
      <li>
        <span>{{ item.positionText }}</span>
      </li>
      <li>
        {{ Driver.givenName }} <span>{{ Driver.familyName }}</span>
      </li>
      <li>{{ Constructors[0] ? Constructors[0].name : '-' }}</li>
      <li>{{ item.points }}</li>
    </TableItem>
  </TableComponent>
</template>

<script setup>
import { computed } from 'vue'
import TableComponent from '@/components/utilities/TableComponent.vue'
import { useDriversStore } from '@/store/drivers'
import TableItem from '@/components/utilities/TableItem.vue'

const driverStore = useDriversStore()
const standing = computed(() => driverStore.getStanding)
</script>
