<template>
  <header>
    <form class="search-content" @submit.prevent="submitSeason">
      <ButtonSeason
        v-if="previous"
        :click="previousSeason"
        :year="state.previousSeason"
      ></ButtonSeason>
      <div class="input-search">
        <input
          type="text"
          placeholder="Pesquise por uma temporada"
          v-model="state.inputSeason"
          maxlength="4"
          minlength="4"
          @input="
            state.inputSeason = state.inputSeason.replace(/[^0-9\.]/g, '')
          "
        />
        <IconComponent
          :path="mdiMagnify"
          :size="22"
          :color="$style.icon"
          class="icon"
        ></IconComponent>
      </div>
      <ButtonSeason
        v-if="next"
        :click="nextSeason"
        :year="state.nextSeason"
      ></ButtonSeason>
    </form>
    <h2>{{ formulaStore.getSeason }}</h2>
  </header>
</template>

<script setup>
import { mdiMagnify } from "@mdi/js";
import { reactive, onMounted, computed, watch } from "vue";
import { useFormulaStore } from "../stores/formulaStore";
import { useDatetime } from "../utils/datetime";
import { minSeasonYear } from "../utils/formulaRules";
import IconComponent from "./utilities/IconComponent.vue";
import ButtonSeason from "./utilities/ButtonSeason.vue";

const formulaStore = useFormulaStore();
const { parseDatetime, getNow } = useDatetime();

const currentYear = getNow().year

const season = computed(() => parseDatetime(formulaStore.getSeason, "yyyy"));
const previous = computed(() => state.previousSeason >= minSeasonYear);
const next = computed(() => state.nextSeason <= currentYear);

const state = reactive({
  previousSeason: null,
  nextSeason: null,
  inputSeason: "",
});

const setYearsOfSeasons = () => {
  state.previousSeason = season.value.minus({ year: 1 }).toFormat("yyyy");
  state.nextSeason = season.value.plus({ year: 1 }).toFormat("yyyy");
};

const previousSeason = () => formulaStore.setSeason(state.previousSeason);
const nextSeason = () => formulaStore.setSeason(state.nextSeason);

const submitSeason = () => {
  const inputSeason = parseInt(state.inputSeason);
  const validations = [inputSeason < minSeasonYear, inputSeason > currentYear];

  if (validations.includes(true)) {
    console.log("error");
  } else {
    formulaStore.setSeason(state.inputSeason);
  }
};

watch(() => formulaStore.getSeason, setYearsOfSeasons);
onMounted(setYearsOfSeasons);
</script>

<style module>
:export {
  icon: var(--icon);
}
</style>

<style scoped>
.light header {
  --input: #fff;
  --input-border: #ccc;
  --icon: #888;
}

header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search-content {
  display: flex;
  align-items: center;
  column-gap: 12px;
}

.input-search input {
  background-color: var(--input);
  border: 1px solid var(--input-border);
  border-radius: 8px;
}

.input-search {
  width: max-content;
  position: relative;
  display: flex;
  align-items: center;
}

.input-search input {
  padding: 10px 16px;
  min-width: 325px;
}

.input-search .icon {
  position: absolute;
  right: 16px;
}

h2 {
  font-family: var(--font-bold);
  text-decoration: underline;
  color: var(--primary);
}
</style>
