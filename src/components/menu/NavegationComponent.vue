<template>
  <nav>
    <ul class="menu-list">
      <li
        v-for="(item, index) in state.menuList"
        :key="index"
        :class="{ selected: state.itemSelected === index }"
      >
        <router-link :to="item.route"
          ><MaterialIcon :icon="item.icon"></MaterialIcon
        ></router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useApp } from '@/js/app'
import { computed, reactive, watch } from 'vue'
import MaterialIcon from '../utilities/MaterialIcon.vue'

const { router } = useApp()

const state = reactive({
  menuList: [
    { icon: 'mdi-racing-helmet', route: '/drivers' },
    { icon: 'mdi-tools', route: '/constructors' },
    { icon: 'mdi-flag-checkered', route: '/races' },
    { icon: 'mdi-monitor-dashboard', route: '/stats' }
  ],
  itemSelected: 0
})

const currentRoute = computed(() => router.currentRoute.value)

const selectItem = (index) => (state.itemSelected = index)

watch(currentRoute, (route) => {
  const index = state.menuList.findIndex(
    (elem) => elem.route === route.fullPath
  )
  selectItem(index)
})
</script>

<style scoped>
.menu-list{
  --primary: white;
}

.dark-mode .menu-list{
  --primary: #252525;
}

.menu-list {
  display: flex;
  column-gap: 12px;
  align-items: center;
}

.menu-list li {
  background-color: var(--primary);
  padding: 10px 14px;
  font-size: 1.4em;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.menu-list li a {
  color: var(--text);
}

.menu-list :is(.selected, li:hover) {
  background-color: var(--red);
}

.menu-list :is(.selected a, li:hover a) {
  color: white;
}
</style>
