<template>
  <section class="main-content">
    <header>
      <div class="header-text">
        <slot name="text"></slot>
      </div>
      <slot name="header"></slot>
    </header>

    <slot></slot>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 40px;
  overflow: hidden;
}

.main-content header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-text {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}
</style>
