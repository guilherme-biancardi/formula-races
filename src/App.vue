<template>
  <main>
    <Menu :path="path"></Menu>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script>
import { computed, watch } from "@vue/runtime-core";
import Menu from "./components/Menu.vue";
import axios from "axios";
import { useBase } from "./baseMixin";

export default {
  components: { Menu },
  setup() {
    const { store, route, moment } = useBase();

    store.commit("setSeason", moment().year());

    const path = computed(() => route.path),
      season = computed(() => store.getters.season);

    const getDrivers = async () => {
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
      getConstructors = async () => {
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
      getRaces = async () => {
        axios
          .get(
            `${process.env.VUE_APP_FORMULA_API}/${season.value}/results.json?limit=1000`
          )
          .then(({ data }) => {
            const {Races} = data.MRData.RaceTable
            store.commit("setRaces", Races); 
          });
      };

    const getAll = () => {
      getDrivers();
      getConstructors();
      getRaces();
    };

    getAll();
    watch(season, getAll);

    return {
      path,
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
}

@font-face {
  font-family: "f1-bold";
  src: url("./assets/font/Formula1-Bold.ttf");
}

@font-face {
  font-family: 'f1-black';
  src: url('./assets/font/Formula1-Black.ttf');
}

@font-face {
  font-family: 'f1-wide';
  src: url('./assets/font/Formula1-Wide.ttf');
}

:root {
  --body: #f0f0f0;
  --red: #e10600;
  --f1-bold: "f1-bold";
  --f1-regular: 'f1-regular';
  --f1-black: 'f1-black';
  --f1-wide: 'f1-wide';
  --text: #222;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "f1-regular", sans-serif;
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
  background-color: var(--body);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: var(--text);
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