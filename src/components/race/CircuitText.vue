<template>
  <div class="circuit-text">
    <h2>
      <span>{{ circuit.name }}</span> - {{ circuit.locality }},
      {{ circuit.country }}
    </h2>
    <p>{{ raceDate }}</p>
  </div>
</template>

<script setup>
import { useApp } from '@/js/app'
import { computed } from 'vue'

const { moment } = useApp()

const props = defineProps({
  circuit: Object
})

const raceDate = computed(() => {
  const { date, time } = props.circuit.roundDate

  return !time
    ? moment(`${date}`).format('LL')
    : moment(`${date} ${time}`).format('LLL')
})
</script>

<style scoped>
.circuit-text {
  display: flex;
  flex-direction: column;
  row-gap: 4px;

  --date: #444;
}

.dark-mode .circuit-text {
  --date: #999;
}

.circuit-text h2 {
  font-size: 0.9em;
  font-weight: 100;
}

.circuit-text h2 span {
  font-size: 0.95em;
}

.circuit-text p {
  font-size: 0.74em;
  color: var(--date);
  font-weight: 100;
}
</style>
