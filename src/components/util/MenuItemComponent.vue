<template>
  <li>
    <RouterLink
      :to="{ name: item.route }"
      v-slot="{ isActive }"
      active-class="item-selected"
      class="menu-item-link"
    >
      <IconComponent
        :="item.icon"
        :options="{ size: iconSize, weight: isActive ? 'duotone' : 'regular' }"
      ></IconComponent>

      <slot></slot>
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
import { useGlobal } from '@/ts/composables/global';
import IconComponent, { type Icon } from './IconComponent.vue';

const { colors } = useGlobal();

export interface MenuItem {
  icon: Icon;
  route: string;
}

withDefaults(defineProps<{ item: MenuItem; iconSize?: number }>(), {
  iconSize: 24
});
</script>

<style scoped>
li {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.menu-item-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: v-bind('colors?.darkText');
  padding: 6px;
  transition: all 150ms ease;
  border-bottom: 2px solid transparent;
  text-decoration: none;
  column-gap: 8px;
}

:is(.item-selected, .menu-item-link:hover) {
  color: v-bind('colors?.primary');
  border-color: v-bind('colors?.primary');
}
</style>
