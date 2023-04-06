import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { useDatetime } from "../utils/datetime";

const { getNowFromFormat } = useDatetime();

export const useFormulaStore = defineStore("formula", () => {
  const state = reactive({
    season: getNowFromFormat("yyyy"),
  });

  const setSeason = (season) => (state.season = season);

  const getSeason = computed(() => state.season);

  return { getSeason, setSeason };
});
