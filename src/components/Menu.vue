<template>
  <nav>
    <ul class="types-table-list">
      <router-link
        :to="route"
        class="types-table-item"
        :class="{ selected: index === data.typeSelected }"
        @click="data.typeSelected = index"
        v-for="({ icon, route }, index) in data.typesTable"
        :key="index"
      >
        <Icon :name="icon"></Icon>
      </router-link>
    </ul>
    <div class="season-content">
      <form @submit.prevent="search">
        <input
          type="text"
          v-model="data.season.year"
          minlength="4"
          maxlength="4"
          placeholder="Search for a season"
          @input="onlyNumbers($event)"
          @change="data.season.year = verifyYear()"
          class="season-search"
        />
        <button class="season-button">
          <Icon :name="'mdi-magnify'"></Icon>
        </button>
      </form>
      <h2>{{ data.season.seasonText }}</h2>
    </div>
  </nav>
</template>

<script>
import { onMounted, onUpdated, reactive } from "@vue/runtime-core";
import Icon from "./utilities/Icon.vue";
import { useBase } from "../baseMixin";

export default {
  components: { Icon },
  props: {
    path: String,
  },
  setup(props) {
    const { store, moment } = useBase();

    const data = reactive({
      typeSelected: undefined,
      typesTable: [
        {
          route: "/drivers",
          icon: "mdi-racing-helmet",
        },
        {
          route: "/constructors",
          icon: "mdi-tools",
        },
        {
          route: "/races",
          icon: "mdi-flag-checkered",
        },
        {
          route: "/graphics",
          icon: "mdi-monitor-dashboard",
        },
      ],
      season: {
        year: undefined,
        max: 0,
        min: 1950,
        seasonText: "",
      },
    });

    onMounted(() => {
      const season = store.getters.season, year = moment().year()
      data.season.seasonText = !season ? year : season
      data.season.max = year
    })

    onUpdated(() => {
      data.typeSelected = data.typesTable.findIndex(
        (elem) => elem.route === props.path
      );
    });

    const onlyNumbers = ({ target }) => {
        target.value = target.value.replace(/[^0-9.]/g, "");
      },
      verifyYear = () => {
        const { min, max, year } = data.season,
          verifications = [Number(year) < min, Number(year) > max];

        return verifications.some((value) => !!value) && year !== ""
          ? max
          : year;
      },
      search = () => {
        const { min, max, year } = data.season,
          verifications = [Number(year) < min, Number(year) > max, year === undefined];

        if (!verifications.some((value) => value)) {
          store.commit("setSeason", Number(year));
          data.season.seasonText = year;
          data.season.year = null;
        }
      };

    return {
      data,
      search,
      verifyYear,
      onlyNumbers,
    };
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 64px;
  --primary: white;
  --color-icon: var(--red);
}

.dark-mode nav{
  --primary: #252525;
  --color-icon: #dadada;
}

.types-table-list {
  display: flex;
  column-gap: 8px;
}

.types-table-item,
.season-search {
  background-color: var(--primary);
  color: var(--color-icon);
  padding: 8px 12px;
  font-size: 1.5em;
  border-radius: 5px;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.types-table-item:hover,
.selected {
  background-color: var(--red);
  color: white;
}

form {
  display: flex;
  align-items: center;
  column-gap: 12px;
}

.season-content {
  display: flex;
  align-items: center;
  column-gap: 20px;
}

.season-content h2 {
  color: var(--red);
  font-size: 1.5em;
  font-family: var(--f1-black);
  text-decoration: underline 2px var(--red);
  font-weight: 100;
  margin-top: 3px;
}

.season-search {
  font-size: 0.9em;
  color: var(--text);
  border-radius: 8px;
  padding: 8px 16px;
}

.season-search::placeholder {
  font-size: 0.8em;
}

.season-button {
  color: white;
  background-color: var(--red);
  padding: 4px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1em;
  cursor: pointer;
}
</style>