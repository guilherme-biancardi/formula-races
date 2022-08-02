<template>
  <TableComponent
    :headers="['position', 'driver', 'team', 'points']"
    :rows="10"
    :columns="5"
  >
    <TableItem
      v-for="({ Driver, Constructors, ...item }, index) in standing"
      :key="index"
      :columns="5"
    >
      <li>
        <span>{{ item.positionText }}</span>
      </li>
      <li>
        {{ Driver.givenName }} <span>{{ Driver.familyName }}</span>
      </li>
      <li>{{ Constructors[0] ? Constructors[0].name : '-' }}</li>
      <li>{{ item.points }}</li>
      <li>
        <a :href="Driver.url" target="_blank"
          ><MaterialIcon :icon="'mdi-open-in-new'"></MaterialIcon
        ></a>
      </li>
    </TableItem>
  </TableComponent>
</template>

<script setup>
import { computed } from 'vue'
import TableComponent from '@/components/utilities/TableComponent.vue'
import { useDriversStore } from '@/store/drivers'
import TableItem from '@/components/utilities/TableItem.vue'
import MaterialIcon from '@/components/utilities/MaterialIcon.vue'

const driverStore = useDriversStore()
const standing = computed(() => driverStore.getStanding)
</script>
