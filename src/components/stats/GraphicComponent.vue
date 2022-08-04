<template>
  <LoadingComponent v-if="isLoading"></LoadingComponent>
  <div class="graphic-content" v-else>
    <div>
      <h2>{{ title }}</h2>
      <ul class="select-list">
        <li
          v-for="(item, i) in length"
          :key="i"
          :class="{ selected: index === i }"
        >
          <button @click="emit('selectGraphic', i)">
            <MaterialIcon :icon="'mdi-checkbox-blank-circle'"></MaterialIcon>
          </button>
        </li>
      </ul>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import LoadingComponent from '../utilities/LoadingComponent.vue'
import MaterialIcon from '../utilities/MaterialIcon.vue'

defineProps({
  title: String,
  isLoading: Boolean,
  index: Number,
  length: Number
})

const emit = defineEmits(['selectGraphic'])
</script>

<style scoped>
.graphic-content {
  --graphic: #fff;
  --text: var(--red);
  --button: #cacaca;
}

.dark-mode .graphic-content {
  --graphic: #252525;
  --text: #eee;
  --button: #777;
}

.graphic-content {
  padding: 16px 24px;
  border-radius: 8px;
  background-color: var(--graphic);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

.graphic-content > div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select-list {
  display: flex;
  column-gap: 8px;
}

h2 {
  font-size: 1.06em;
  color: var(--text);
  font-weight: 100;
}

button {
  background-color: transparent;
  color: var(--button);
  font-size: 1em;
}

.selected > button {
  color: var(--red);
}
</style>
