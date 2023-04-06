import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { useDatetime } from "../utils/datetime";

const { getNow } = useDatetime();

const currentYear = getNow().year

export const useFormulaStore = defineStore("formula", () => {
  const state = reactive({
    season: currentYear,
  });

  const setSeason = (season) => (state.season = season);

  const getSeason = computed(() => state.season);

  return { getSeason, setSeason };
});
