<template>
  <ul class="page-list">
    <li v-for="(item, index) in pages" :key="index">
      <button
        :class="{ selected: state.pageSelected === index }"
        @click="selectPage(index)"
      >
        <IconComponent :path="mdiCircle" :size="20"></IconComponent>
      </button>
    </li>
  </ul>
</template>

<script setup>
import { mdiCircle } from "@mdi/js";
import IconComponent from "./IconComponent.vue";
import { reactive } from "vue";

const emit = defineEmits(["selectPage"]);

defineProps({
  pages: Number,
});

const state = reactive({
  pageSelected: 0,
});

const selectPage = (index) => {
  state.pageSelected = index;
  emit("selectPage", index);
};
</script>

<style scoped>
.light .page-list {
  --circle: #bbb;
  --hover-brightness: 90%;
}

.dark .page-list {
  --circle: #444;
  --hover-brightness: 130%;
}

.page-list {
  display: flex;
  column-gap: 8px;
}

.page-list button {
  transition: all 0.2s ease;
}

.page-list button:not(.selected) {
  color: var(--circle);
}

.page-list button:hover {
  filter: brightness(var(--hover-brightness));
}

.selected {
  color: var(--primary);
}
</style>
