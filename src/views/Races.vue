<template>
  <div class="races-content">
    <div class="circuit-content" v-if="races.length">
      <div class="circuit-text">
        <h2>
          <span>{{ circuit.name }}</span> - {{ circuit.locality }},
          {{ circuit.country }}
        </h2>
        <p>{{ round ? round.time : "" }}</p>
      </div>
      <select v-model="data.raceSelected">
        <option
          :value="index"
          v-for="(round, index) in data.rounds"
          :key="index"
        >
          {{ round.raceName }}
        </option>
      </select>
    </div>
    <Table
      :headers="
        races.length ? ['posição', 'piloto', 'equipe', 'pontos ganhos'] : ['sem dados']
      "
    >
      <ul v-for="({Driver, Constructor, ...item}, index) in race" :key="index">
        <li>
          <span>{{ item.positionText }}</span>
        </li>
        <li>
          {{ Driver.givenName }} <span>{{ Driver.familyName }}</span>
        </li>
        <li>{{ Constructor ? Constructor.name : "-" }}</li>
        <li>{{ item.points }}</li>
      </ul>
    </Table>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useBase } from "../baseMixin";
import Table from "../components/utilities/Table.vue";
import { computed, onMounted, watch } from "@vue/runtime-core";

export default {
  components: { Table },
  setup() {
    const { store, moment } = useBase();

    const data = reactive({
      raceSelected: 0,
      rounds: [],
    });

    const races = computed(() => store.getters.races),
      round = computed(() => data.rounds[data.raceSelected] || null),
      circuit = computed(() => {
        if (races.value.length) {
          const { circuitName, Location } =
            races.value[data.raceSelected].Circuit;

          return {
            name: circuitName,
            country: Location.country,
            locality: Location.locality,
          };
        }
        return {
          name: "",
          country: "",
          locality: "",
        };
      }),
      race = computed(() => {
        if (races.value.length) {
          const { Results } = races.value[data.raceSelected];
          return Results;
        }
        return [];
      });

    const setRounds = () =>
      (data.rounds = races.value.map(({ raceName, time, date }) => ({
        raceName,
        time: moment(`${date} ${time ? time.replace("Z", "") : ""}`)
          .locale("pt-br")
          .format(`${time ? "LLL" : "LL"}`),
      })));

    onMounted(setRounds);
    watch(races, setRounds);

    return {
      data,
      circuit,
      round,
      races,
      race,
    };
  },
};
</script>

<style scoped>
.races-content {
  display: flex;
  flex-direction: column;
  row-gap: 14px;
}

.races-content,
.circuit-content {
  width: 100%;
}

.circuit-content {
  display: flex;
  justify-content: space-between;
}

.circuit-content select {
  all: unset;
  background: url("../assets/chevron-down.svg") no-repeat;
  background-position: 245px center;
  background-size: 20px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 2px 12px;
  padding-right: 50px;
  font-size: 0.85em;
  border-radius: 5px;
  min-width: 210px;
}

.circuit-text {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.circuit-text h2 {
  font-size: 0.9em;
  font-weight: 100;
}

.circuit-text h2 span {
  font-size: 0.95em;
}

.circuit-text p {
  font-size: 0.74em;
  color: #444;
  font-weight: 100;
}
</style>