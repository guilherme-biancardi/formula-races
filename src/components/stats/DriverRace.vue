<template>
  <ul class="race-list">
    <li v-for="(item, index) in driverRace" :key="index">
      <div class="item-text" v-if="item.value">
        <p>{{ item.label }}</p>
        <h3>{{ item.value }}</h3>
      </div>
      <a :href="item.link" v-if="!item.value" target="_blank">{{
          item.label
      }}</a>
      <MaterialIcon :icon="item.icon"></MaterialIcon>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue'
import MaterialIcon from '../utilities/MaterialIcon.vue'

const props = defineProps({
  result: Object,
  race: Object
})

const driverRace = computed(() => {
  try {
    const { grid, FastestLap, positionText, status } = props.result
    const { url, raceName } = props.race

    return [
      {
        label: 'starting grid',
        value: `${grid}º`,
        icon: 'mdi-checkerboard'
      },
      {
        label: 'fastest lap',
        value: FastestLap?.Time.time || '---',
        icon: 'mdi-timer-outline'
      },
      {
        label: 'position',
        value: `${positionText}${Number(positionText) ? 'º' : ''}`,
        icon: 'mdi-podium'
      },
      {
        label: 'status',
        value: status,
        icon: 'mdi-check'
      },
      {
        link: url,
        label: raceName,
        icon: 'mdi-link'
      }
    ]
  } catch {
    return null
  }
})
</script>

<style scoped>
.race-list {
  --item: #fff;
  --text: #555;
}

.dark-mode .race-list {
  --item: #252525;
  --text: #999;
}
.race-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.race-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--item);
  box-shadow: var(--shadow);
  padding: 12px 14px;
  border-radius: 8px;
}

.item-text {
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  justify-content: center;
}

.item-text p {
  font-size: 0.8em;
  text-transform: capitalize;
  color: var(--text);
}

.item-text h3 {
  font-weight: 100;
}

i {
  font-size: 1.5em;
  color: var(--red);
}

a {
  font-size: 0.7em;
  text-decoration: underline;
  color: var(--text);
}
</style>
