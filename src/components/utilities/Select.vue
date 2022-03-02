<template>
  <div class="select-content">
    <label for="select" v-if="label">{{ label }}</label>
    <select v-model="value" name="select">
      <slot></slot>
    </select>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
export default {
  emits: ["select"],
  props: {
    label: String,
  },
  setup(props, { emit }) {
    const value = ref(0);

    watchEffect(value, emit("select", value));

    return {
      value,
    };
  },
};
</script>

<style scoped>
.select-content {
  display: flex;
  flex-direction: column;
  row-gap: 8px !important;
  --primary: white;
}

.dark-mode .select-content {
  --primary: #252525;
}

label {
  font-size: 0.8em;
  font-weight: 100;
}

label::first-letter{
  text-transform: capitalize;
}

select {
  all: unset;
  background: url("../../assets/chevron-down.svg") no-repeat;
  background-position: 245px center;
  background-size: 20px;
  background-color: var(--primary);
  padding: 10px 12px;
  padding-right: 50px !important;
  font-size: 0.75em;
  border-radius: 5px;
  width: 210px;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}
</style>