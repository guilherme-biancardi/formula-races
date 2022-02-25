<template>
  <Table
    :headers="
      constructors.length
        ? ['posição', 'construtor', 'vitórias', 'pontos']
        : ['Sem Dados']
    "
  >
    <ul
      v-for="({ Constructor, ...item }, index) in constructors"
      :key="index"
    >
      <li>
        <span>{{ item.positionText }}</span>
      </li>
      <li>{{ Constructor.name }}</li>
      <li>{{ item.wins }}</li>
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

    const constructors = computed(() => store.getters.constructors);

    return {
      constructors,
    };
  },
};
</script>