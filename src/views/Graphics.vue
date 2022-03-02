<template>
  <div class="graphic-content">
    <div>
      <Select @select="selectDriver" :label="'select driver:'">
        <option
          v-for="({ givenName, familyName }, index) in drivers"
          :key="index"
          :value="index"
        >
          {{ givenName }} {{ familyName }}
        </option>
      </Select>
      <div class="graphic">
        <h2 v-if="results">Points earned during the season:</h2>
        <h2 v-if="!results">No data</h2>
        <line-chart
          v-if="!data.loading"
          :data="resultsCache[data.driverSelected] || data.driverResult"
          :colors="['#e10600']"
          :min="0"
          :max="maxPoints"
          :curve="false"
          width="520px"
          height="335px"
          ytitle="Points"
          xtitle="Races"
        ></line-chart>
        <Loading v-if="data.loading"></Loading>
      </div>
    </div>
    <div>
      <Select
        @select="selectRace"
        :label="`select ${drivers[data.driverSelected].familyName} race:`"
      >
        <option
          :value="index"
          v-for="(round, index) in data.rounds"
          :key="index"
        >
          {{ round.raceName }}
        </option>
        <option v-show="!results" value="0" disabled>no data</option>
      </Select>
      <ul class="driver-list">
        <li>
          <div>
            <p>starting grid</p>
            <h3>{{ results ? `${results.grid}º` : "---" }}</h3>
          </div>
          <Icon :name="'mdi-checkerboard'"></Icon>
        </li>
        <li>
          <div>
            <p>fastest lap</p>
            <h3>
              {{
                results
                  ? results.FastestLap
                    ? results.FastestLap.Time.time
                    : "---"
                  : "---"
              }}
            </h3>
          </div>
          <Icon :name="'mdi-timer-outline'"></Icon>
        </li>
        <li>
          <div>
            <p>position</p>
            <h3>{{ results ? results.positionText : "---" }}</h3>
          </div>
          <Icon :name="'mdi-podium'"></Icon>
        </li>
        <li>
          <div>
            <p>status</p>
            <h3>{{ results ? results.status : "---" }}</h3>
          </div>
          <Icon :name="'mdi-check'"></Icon>
        </li>
        <li>
          <div>
            <a
              :href="races[data.raceSelected].url"
              target="_blank"
              v-if="results"
              >more about the race</a
            >
            <p v-if="!results">no data</p>
          </div>
          <Icon :name="'mdi-link'"></Icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, watch } from "@vue/runtime-core";
import { useBase } from "../baseMixin";
import Select from "../components/utilities/Select.vue";
import Icon from "../components/utilities/Icon.vue";
import Loading from "../components/utilities/Loading.vue";

export default {
  components: { Select, Icon, Loading },
  setup() {
    const { store, axios } = useBase();

    const drivers = computed(() =>
        store.getters.drivers.map(({ Driver }) => Driver)
      ),
      races = computed(() => store.getters.races),
      results = computed(() => {
        if (races.value.length) {
          return races.value[data.raceSelected].Results.filter(
            ({ Driver }) =>
              Driver.driverId === drivers.value[data.driverSelected].driverId
          )[0];
        }

        return null;
      }),
      season = computed(() => store.getters.season),
      maxPoints = computed(() => store.getters.maxPoints),
      resultsCache = computed(() => store.getters.resultsCache);

    const data = reactive({
      driverSelected: 0,
      raceSelected: 0,
      rounds: [],
      driverResult: {},
      loading: false,
    });

    const getDriverResult = async (index) => {
      const { driverId } = drivers.value[index];

      if (!resultsCache.value[data.driverSelected]) {
        data.loading = true
        await axios
          .get(
            `${process.env.VUE_APP_FORMULA_API}/${season.value}/drivers/${driverId}/results.json`
          )
          .then((res) => {
            const obj = {};
            const { Races } = res.data.MRData.RaceTable;
            const result = Races.map(({ Results, raceName }) => ({
              [raceName]: Results.pop().points,
            }));
            result.forEach((driverResult) => {
              const name = Object.keys(driverResult).pop();
              obj[name] = driverResult[name];
            });
            data.driverResult = obj;
            store.commit("setCache", { index, obj });
            data.loading = false;
          });
          
      }
    };

    const setRounds = () => {
      getDriverResult(0);
      data.rounds = races.value.map(({ raceName }) => ({ raceName }));
    };
    const selectDriver = (value) => (data.driverSelected = value);
    const selectRace = (value) => (data.raceSelected = value);

    watch(drivers, () => {
      store.commit("resetCache");
      data.raceSelected = 0;
      data.driverSelected = 0;
    });
    watch(
      computed(() => data.driverSelected),
      (index) => getDriverResult(index)
    );

    watch(races, setRounds);
    onMounted(setRounds);

    return {
      drivers,
      data,
      races,
      results,
      maxPoints,
      selectRace,
      selectDriver,
      resultsCache,
    };
  },
};
</script>

<style scoped>
.graphic-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  column-gap: 24px;

  --primary: white;
  --graphic-title: var(--red);
  --title-list: #555;
}

.dark-mode .graphic-content {
  --primary: #252525;
  --graphic-title: var(--eee);
  --title-list: #aaa;
}

.graphic-content div {
  display: flex;
  flex-direction: column;
  row-gap: 14px;
}

.graphic {
  display: flex;
  flex-direction: column;
  row-gap: 14px;
  width: max-content;
  background-color: var(--primary);
  padding: 12px 20px;
  border-radius: 5px;
  min-width: 500px;
  min-height: 300px;
}

.graphic img {
  max-width: 275px;
  margin: 12px auto;
}

.graphic h2 {
  font-size: 0.95em;
  font-weight: 100;
  color: var(--graphic-title);
  margin-left: -6px;
}

.graphic div {
  min-width: 520px;
  min-height: 335px;
}

.driver-list h2 {
  font-weight: 100;
  font-size: 1.5em;
  font-family: var(--f1-bold);
}

.driver-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 14px;
}

.driver-list li {
  width: 100%;
  background-color: var(--primary);
  border-radius: 5px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.driver-list li > i {
  font-size: 1.5em;
  color: var(--red);
}

.driver-list li div {
  row-gap: 8px;
}

.driver-list li div h3 {
  font-weight: 100;
}

.driver-list li div > p {
  font-size: 0.8em;
  text-transform: capitalize;
  color: var(--title-list);
}

.driver-list li a {
  font-size: 0.75em;
  color: var(--text);
}
</style>