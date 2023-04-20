<template>
  <div class="select-content">
    <SelectComponent
      :values="driversName"
      v-for="(driver, index) in driversSelected"
      :key="index"
      :value-selected="driver"
      :disable-list="driversSelected"
      @select="selectDriver(index).select"
      default-value="Select Driver"
    ></SelectComponent>
    <button @click="emit(isMaxLength ? 'deleteDriver' : 'addDriver')">
      <IconComponent
        :path="isMaxLength ? mdiDeleteOutline : mdiPlus"
        :size="22"
      ></IconComponent>
    </button>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useFormulaStore } from "../../stores/formulaStore";
import SelectComponent from "../utilities/SelectComponent.vue";
import IconComponent from "../utilities/IconComponent.vue";
import { mdiDeleteOutline, mdiPlus } from "@mdi/js";

const formulaStore = useFormulaStore();
const driversName = computed(() =>
  formulaStore.getDrivers.map(
    ({ Driver }) => `${Driver.givenName} ${Driver.familyName}`
  )
);

const emit = defineEmits(["selectDriver", "addDriver", "deleteDriver"]);

const props = defineProps({
  driversSelected: Array,
});

const state = reactive({
  maxSelectLength: 2,
});

const isMaxLength = computed(
  () => props.driversSelected.length >= state.maxSelectLength
);

const selectDriver = (index) => ({
  select: (value) => emit("selectDriver", index, value),
});
</script>

<style scoped>
.select-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

button {
  padding: 5px 6px;
  background-color: var(--light);
  color: var(--primary);
  border-radius: 4px;
  border: 1px solid var(--light-medium);
  display: flex;
  align-items: center;
}
</style>
