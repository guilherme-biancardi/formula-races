<template>
  <div class="loading">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.loading{
    display: flex;
    align-items: center;
    justify-content: center;
    row-gap: 12px !important;
}

.lds-ring {
  display: inline-block;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 48px;
  height: 48px;
  border: 3px solid;
  border-radius: 50%;
  animation: lds-ring 0.7s linear infinite;
  border-color: var(--red) transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.35s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.30s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>