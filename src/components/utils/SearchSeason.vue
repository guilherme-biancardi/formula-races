<template>
  <div class="search-season-content">
    <div class="season-buttons-content">
      <label for="season-buttons-list">Select Season:</label>
      <menu id="season-buttons-list">
        <li v-if="previousYear >= appStore.getMinimumYear">
          <button class="season-button" @click="seasonSelected = previousYear">
            {{ previousYear }}
          </button>
        </li>
        <li>
          <VueDatePicker v-bind="seasonYearPicker" v-model="seasonSelected"></VueDatePicker>
        </li>
        <li v-if="nextYear <= appStore.getMaximumYear">
          <button class="season-button" @click="seasonSelected = nextYear">{{ nextYear }}</button>
        </li>
        <li>
          <h1>{{ appStore.getSeason }}</h1>
        </li>
      </menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { useDatetime } from '@/ts/datetime';
import VueDatePicker, { type VueDatePickerProps } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import '@/assets/datepicker.css';

import { useDebounceFn } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

const appStore = useAppStore();
const { convertObjectToJsDate } = useDatetime();

const seasonSelected = ref<number>(appStore.getSeason);

const previousYear = computed(() => seasonSelected.value - 1);
const nextYear = computed(() => seasonSelected.value + 1);

const seasonYearPicker = computed<VueDatePickerProps>(() => ({
  minDate: convertObjectToJsDate({ year: appStore.getMinimumYear }),
  maxDate: convertObjectToJsDate({ year: appStore.getMaximumYear }),
  yearPicker: true,
  selectText: 'Selecionar',
  cancelText: 'Cancelar',
  dark: appStore.theme,
  clearable: false
}));

const updateSeason = useDebounceFn(() => appStore.setSeason(seasonSelected.value), 500);

watch(seasonSelected, updateSeason);
</script>

<style scoped>
.search-season-content,
.season-buttons-content {
  width: 100%;
  display: flex;
  align-items: center;
}

.search-season-content {
  justify-content: space-between;
}

.season-buttons-content {
  row-gap: 10px;
  flex-direction: column;
  align-items: flex-start;
}

.season-buttons-content > label {
  font-family: var(--font-bold);
  color: var(--text-medium);
  font-size: 0.95em;
}

#season-buttons-list {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
}

#season-buttons-list li:last-child {
  margin-left: auto;
  font-family: var(--font-bold);
  color: var(--primary);
  text-decoration: 2px solid underline;
  font-size: 1.2em;
}

.season-button {
  padding: 6px 14px;
  background-color: var(--light);
  border-radius: 8px;
  border: 1px solid var(--light-medium);
  color: var(--primary);
  transition: all 0.2s ease;
}

.season-button:hover {
  background-color: var(--primary);
  color: #fff;
}
</style>
