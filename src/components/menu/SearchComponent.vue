<template>
  <form class="form-search" @submit.prevent="submitSearch">
    <input
      type="text"
      placeholder="Search for a season"
      v-model="state.season"
    />
    <button><MaterialIcon :icon="'mdi-magnify'"></MaterialIcon></button>
    <h2>{{ seasonComputed }}</h2>
  </form>
</template>

<script setup>
import { useStore } from '@/store/store'
import { computed, reactive } from 'vue'
import MaterialIcon from '../utilities/MaterialIcon.vue'

const store = useStore()

const state = reactive({
  season: '',
  validations: (year) => ({
    [year >= 1950 && year <= store.getCurrentYear]: () => store.setSeason(year)
  })
})

const submitSearch = () => {
  state.validations(state.season).true()
  state.season = ''
}

const seasonComputed = computed(() => store.getSeason)
</script>

<style scoped>
.form-search{
  --primary: white;
}

.dark-mode .form-search{
  --primary: #252525;
}

h2 {
  font-family: var(--f1-black);
  color: var(--red);
  font-size: 1.6em;
  align-self: flex-end;
  text-decoration: 2px underline var(--red);
}

.form-search {
  display: flex;
  align-items: center;
  column-gap: 16px;
}

.form-search input {
  padding: 10px 20px;
  border-radius: 16px;
  min-width: 270px;
  box-shadow: var(--shadow);
  background-color: var(--primary);
  color: var(--text);
}

.form-search button {
  background-color: var(--red);
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.1em;
}
</style>
