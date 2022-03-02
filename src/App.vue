<template>
  <main :class="{ 'dark-mode': isDarkTheme }">
    <Dark-mode-button></Dark-mode-button>
    <section>
      <Menu :path="path"></Menu>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </section>
  </main>
</template>

<script>
import { computed, watch } from "@vue/runtime-core";
import Menu from "./components/Menu.vue";
import { useBase } from "./baseMixin";
import DarkModeButton from "./components/DarkModeButton.vue";

export default {
  components: { Menu, DarkModeButton },
  setup() {
    const { store, route, moment, axios } = useBase();

    const path = computed(() => route.path),
      season = computed(() => store.getters.season),
      isDarkTheme = computed(() => store.getters.isDarkTheme);

    !season.value ? store.commit("setSeason", moment().year()) : null;

    const getDrivers = () => {
        axios
          .get(
            `${process.env.VUE_APP_FORMULA_API}/${season.value}/driverStandings.json?limit=1000`
          )
          .then(({ data }) => {
            const [{ DriverStandings }] =
              data.MRData.StandingsTable.StandingsLists;

            store.commit("setDrivers", DriverStandings);
          });
      },
      getConstructors = () => {
        axios
          .get(
            `${process.env.VUE_APP_FORMULA_API}/${season.value}/constructorStandings.json?limit=1000`
          )
          .then(({ data }) => {
            try {
              const [{ ConstructorStandings }] =
                data.MRData.StandingsTable.StandingsLists;

              store.commit("setConstructors", ConstructorStandings);
            } catch {
              store.commit("setConstructors", []);
            }
          });
      },
      getRaces = () => {
        axios
          .get(
            `${process.env.VUE_APP_FORMULA_API}/${season.value}/results.json?limit=1000`
          )
          .then(({ data }) => {
            const { Races } = data.MRData.RaceTable;
            store.commit("setRaces", Races);
          });
      };

    const getAll = async () => {
      await Promise.all([getConstructors(), getRaces(), getDrivers()]);
    };

    getAll()
    watch(season, getAll);

    return {
      path,
      isDarkTheme,
    };
  },
};
</script>

<style scoped>
img {
  max-width: 320px;
}
</style>

<style>
@font-face {
  font-family: "f1-regular";
  src: url("./assets/font/Formula1-Regular.ttf");
  font-display: swap;
}

@font-face {
  font-family: "f1-bold";
  src: url("./assets/font/Formula1-Bold.ttf");
  font-display: swap;
}

@font-face {
  font-family: "f1-black";
  src: url("./assets/font/Formula1-Black.ttf");
  font-display: swap;
}

:root {
  --body: #f0f0f0;
  --red: #e10600;
  --f1-bold: "f1-bold", sans-serif;
  --f1-regular: "f1-regular", sans-serif;
  --f1-black: "f1-black", sans-serif;
  --f1-wide: "f1-wide", sans-serif;
  --text: #222;
}

.dark-mode {
  --body: #2f2f2f;
  --text: #e9e9e9;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "f1-regular", sans-serif;
  transition: background-color 0.2s cubic-bezier(0.165, 0.84, 0.44, 1),
    border-color 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
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

ul {
  list-style: none;
}

input,
button {
  border: none;
  outline: none;
}

main {
  width: 100%;
  background-color: var(--body);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: var(--text);
}

section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 14px;
  min-width: 800px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.25s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-from {
  transform: translateX(20px);
}

.fade-leave-to {
  transform: translateX(-20px);
}
</style>