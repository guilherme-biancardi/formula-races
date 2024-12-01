<template>
  <div class="race-info-content">
    <span class="race-info">
      <IconComponent :path="PhMapTrifold" :options="defaultIconOptions"></IconComponent>
      <h3>{{ raceStore.raceInfo?.name }}</h3>
      -
      <p style="align-self: flex-end">
        {{ raceStore.raceInfo?.locality }}, {{ raceStore.raceInfo?.country }}
      </p>
    </span>
    <span class="race-info">
      <IconComponent :path="PhClock" :options="defaultIconOptions"></IconComponent>
      {{ raceStore.raceInfo?.date }}
    </span>
  </div>
</template>

<script setup lang="ts">
import IconComponent, { type Icon } from '@/components/util/IconComponent.vue';
import { useRaceStore } from '@/stores/race';
import { useGlobal } from '@/ts/composables/global';
import { PhClock, PhMapTrifold } from '@phosphor-icons/vue';

const raceStore = useRaceStore();
const { colors, fonts } = useGlobal();

const defaultIconOptions: Icon['options'] = {
  size: 20,
  color: colors?.primary,
  weight: 'duotone'
};
</script>

<style scoped>
.race-info-content {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}

.race-info-content h3 {
  font-family: v-bind('fonts?.fontBold');
  color: v-bind('colors?.text');
  font-size: 1.05rem;
}

.race-info {
  display: flex;
  align-items: center;
  column-gap: 6px;
  font-size: 0.85rem;
  color: v-bind('colors?.softText');
}
</style>
