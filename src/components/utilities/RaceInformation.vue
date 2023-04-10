<template>
  <div class="race-information">
    <p>
      <span class="race-circuit">{{ race.circuitName }}</span> -
      {{ race.locality }}, {{ race.country }}
    </p>
    <p class="race-date">{{ raceDate }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDatetime } from "../../utils/datetime";

const { parseDatetime } = useDatetime();

const props = defineProps({
  race: Object,
});

const raceDate = computed(() => {
  const raceDatetime = `${props.race.date} ${props.race.time}`.replace("Z", "");

  return parseDatetime(raceDatetime, "yyyy-LL-dd HH:mm:ss", "utc")
    .toLocal()
    .toFormat("DDDD - t");
});
</script>

<style scoped>
p{
  font-size: 0.95em;
}

.race-information {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.race-circuit {
  font-weight: 500;
  font-family: var(--font-bold);
}

.race-date {
  font-size: 0.85em;
  opacity: 0.9;
}
</style>
