<template>
  <div class="button">{{ props.title }}</div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{ title: String }>();
</script>

<style scoped lang="scss">
.button {
  margin-top: 50px;
  padding: 10px 20px;
  background: #1e1e1e;
  border: 2px solid #ffffff2f;
  border-radius: 5px;
  font-weight: bold;
  transition: background 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background: #ffffff2f;
  }
}
</style>
