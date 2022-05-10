<template>
  <div class="not-found">
    <img src="" alt="" loading="lazy" />
    <div class="title">Something bad happend :C</div>
    <Button title="Go home" @click="goHome" />
  </div>
</template>

<script setup lang="ts">
import Button from "./Atoms/Button.vue";

const goHome = () => {
  window.location.hash = "#/";
};
</script>

<style scoped lang="scss">
.not-found {
  margin: auto;
  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px auto;
  }
}
</style>
