<template>
  <div class="select-content">
    <label for="select" v-if="label">{{ label }}</label>
    <select
      v-model="state.value"
      name="select"
      @change="emit('select', state.value)"
    >
      <slot></slot>
    </select>
  </div>
</template>

<script setup>
import { useStore } from '@/store/store'
import { computed, reactive, watch } from 'vue'

const store = useStore()
const season = computed(() => store.getSeason)

defineProps({
  label: String
})

const emit = defineEmits(['select'])
const state = reactive({
  value: 0
})

watch(season, () => (state.value = 0))
</script>

<style scoped>
.select-content {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  --primary: white;
}

.dark-mode .select-content {
  --primary: #252525;
}

label {
  font-size: 0.8em;
  font-weight: 100;
}

label::first-letter {
  text-transform: capitalize;
}

select {
  all: unset;
  background: url('../../assets/chevron-down.svg') no-repeat;
  background-position: 245px center;
  background-size: 20px;
  background-color: var(--primary);
  padding: 10px 12px;
  padding-right: 50px;
  font-size: 0.75em;
  border-radius: 5px;
  width: 210px;
  box-shadow: var(--shadow);
}
</style>
