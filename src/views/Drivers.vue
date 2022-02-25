<template>
  <Table :headers="['posição', 'piloto', 'equipe', 'pontos']">
    <ul
      v-for="({ Driver, Constructors, ...item }, index) in drivers"
      :key="index"
    >
      <li>
        <span>{{ item.positionText }}</span>
      </li>
      <li>
        {{ Driver.givenName }} <span>{{ Driver.familyName }}</span>
      </li>
      <li>{{ Constructors[0] ? Constructors[0].name : "-" }}</li>
      <li>{{ item.points }}</li>
    </ul>
  </Table>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useBase } from "../baseMixin";
import Table from "../components/utilities/Table.vue";
export default {
  components: { Table },
  setup() {
    const { store } = useBase();

    const drivers = computed(() => store.getters.drivers);

    return {
      drivers,
    };
  },
};
</script>