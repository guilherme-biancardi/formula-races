<template>
  <MainContent>
    <template #text>
      <h1>{{ route.meta.title }}</h1>
      <h2>{{ route.meta.subtitle }}</h2>
    </template>

    <template #header>
      <Suspense>
        <AsyncContent :fetch-data="dataStore.requestSeasons">
          <VueSelect
            :options="seasonOptions"
            v-model="seasonSelected"
            @option-selected="(option) => appStore.setSeason(option.value)"
            :is-clearable="false"
            :style="{ width: '25ch' }"
            placeholder="Selecione uma temporada"
            :should-autofocus-option="false"
          ></VueSelect>
        </AsyncContent>

        <template #fallback>
          <SkeletonComponent :width="100"></SkeletonComponent>
        </template>
      </Suspense>
    </template>

    <DividerComponent></DividerComponent>

    <AppTransition name="slide-x" mode="out-in">
      <Suspense timeout="0">
        <article :key="appStore.getSeason">
          <AsyncContent :fetch-data="dataStore.requestAll">
            <RouterView v-slot="{ Component }" name="app">
              <AppTransition name="slide-x" mode="out-in">
                <component :is="Component"></component>
              </AppTransition>
            </RouterView>
          </AsyncContent>
        </article>

        <template #fallback>
          <SkeletonComponent></SkeletonComponent>
        </template>
      </Suspense>
    </AppTransition>
  </MainContent>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { useDataStore } from '@/stores/data';
import { useRoute } from 'vue-router';
import MainContent from './contents/MainContent.vue';
import AsyncContent from './contents/AsyncContent.vue';
import SkeletonComponent from './util/SkeletonComponent.vue';
import { computed, ref } from 'vue';
import AppTransition from './util/AppTransition.vue';
import { useGlobal } from '@/ts/composables/global';
import DividerComponent from './util/DividerComponent.vue';
import VueSelect, { type Option } from 'vue3-select-component';

const route = useRoute();
const appStore = useAppStore();
const dataStore = useDataStore();

const { fonts, colors } = useGlobal();

type SeasonOption = Option<number>;
const seasonOptions = computed<SeasonOption[]>(() =>
  dataStore.getSeasons
    .map((item) => ({
      label: item.season,
      value: +item.season
    }))
    .reverse()
);

const seasonSelected = ref<number>(appStore.getSeason);
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-family: v-bind('fonts?.fontBold');
  font-size: 1.3rem;
}

h2 {
  font-weight: 500;
  color: v-bind('colors?.softText');
  font-size: 1rem;
}

article {
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
}
</style>
