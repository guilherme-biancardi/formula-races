<template>
  <select @change="emit('select', state.value)" v-model="state.value">
    <option :value="null" v-if="defaultValue" disabled>
      {{ defaultValue }}
    </option>
    <option
      :value="index"
      v-for="(value, index) in values"
      :key="index"
      :disabled="disableList ? disableItems(index) : false"
    >
      {{ value }}
    </option>
  </select>
</template>

<script setup>
import { reactive } from "vue";

const emit = defineEmits(["select"]);

const props = defineProps({
  defaultValue: String,
  values: Array,
  valueSelected: {
    type: Number,
    default: 0,
  },
  disableList: Array,
});

const disableItems = (value) => props.disableList.includes(value);

const state = reactive({
  value: props.valueSelected ?? null,
});
</script>

<style scoped>
select {
  all: unset;
  min-width: 24ch;
  height: fit-content;
  padding: 10px 12px;
  padding-right: 32px;
  background-color: var(--light);
  border: 1px solid var(--light-medium);
  background-image: url("../../assets/image/chevron-down.svg");
  background-repeat: no-repeat;
  background-position: calc(100% - 6px);
  background-size: 26px;
  border-radius: 8px;
  font-size: 0.8em;
}
</style>
