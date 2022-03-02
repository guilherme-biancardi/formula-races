<template>
  <button :class="{ selected: isDarkTheme }" @click="setTheme">
    <p>dark mode:</p>
    <Icon :name="`mdi-toggle-switch${isDarkTheme ? '' : '-off'}`"></Icon>
  </button>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import Icon from "./utilities/Icon.vue";
import { useBase } from "../baseMixin";
export default {
  components: { Icon },
  setup() {
    const { store } = useBase();

    const theme = ref(false)

    const isDarkTheme = computed(() => store.getters.isDarkTheme)
    
    const setTheme = () => {
        theme.value = !theme.value
        store.commit('setTheme', theme.value)
    };

    onMounted(() => theme.value = isDarkTheme.value)

    return {
      isDarkTheme,
      setTheme
    };
  },
};
</script>

<style scoped>
button{
  --primary: white;
}

.dark-mode button{
  --primary: #252525;
}

button {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  column-gap: 5px;
  background-color: var(--primary);
  padding: 1px 12px;
  border-radius: 5px;
}

button > p {
  font-size: 0.9em;
  color: var(--text);
}

button > p::first-letter {
  text-transform: capitalize;
}

button > i {
  color: #bfbfbf;
  font-size: 1.85em;
  cursor: pointer;
}

.selected i {
  color: var(--red);
}
</style>