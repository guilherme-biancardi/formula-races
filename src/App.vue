<template>
  <ThemeButton></ThemeButton>
  <main>
    <MenuComponent></MenuComponent>
    <router-view></router-view>
  </main>
</template>

<script setup>
import { computed, onBeforeMount, watch } from 'vue'
import MenuComponent from './components/menu/MenuComponent.vue'
import { useApp } from './js/app'
import { useStore } from './store/store'
import ThemeButton from './components/utilities/ThemeButton.vue'
import { useThemeStore } from './store/theme'

const { getConstructorStandings, getDriverStandings, getRacesTable, moment } =
  useApp()

const store = useStore()
const theme = computed(() => useThemeStore().getTheme)

const setTheme = () => document.body.classList.toggle('dark-mode')

const setAll = (year) => {
  getDriverStandings(year)
  getConstructorStandings(year)
  getRacesTable(year)
}

onBeforeMount(() => {
  const year = moment().year()
  store.setSeason(year)
  store.setCurrentYear(year)

  if (theme.value) setTheme()
})

watch(theme, setTheme)

watch(
  computed(() => store.getSeason),
  (season) => setAll(season)
)
</script>

<style>
@font-face {
  font-family: 'f1-regular';
  src: url('./assets/font/Formula1-Regular.ttf');
  font-display: swap;
}
@font-face {
  font-family: 'f1-bold';
  src: url('./assets/font/Formula1-Bold.ttf');
  font-display: swap;
}
@font-face {
  font-family: 'f1-black';
  src: url('./assets/font/Formula1-Black.ttf');
  font-display: swap;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--f1-regular);
}

:root {
  --body: #f0f0f0;
  --red: #e10600;
  --f1-bold: 'f1-bold', sans-serif;
  --f1-regular: 'f1-regular', sans-serif;
  --f1-black: 'f1-black', sans-serif;
  --text: #222;
  --shadow: 0px 3px 6px rgba(0, 0, 0, 0.07);
}

.dark-mode {
  --body: #2f2f2f;
  --text: #e9e9e9;
}

*::-webkit-scrollbar-track {
  background-color: transparent;
}
*::-webkit-scrollbar {
  width: 4px;
}
*::-webkit-scrollbar-thumb {
  background: var(--red);
  border-radius: 8px;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--body);
  color: var(--text);
}

ul {
  list-style: none;
}

button,
input {
  outline: none;
  border: none;
}

a {
  text-decoration: none;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  flex-direction: column;
  min-width: 800px;
}
</style>
