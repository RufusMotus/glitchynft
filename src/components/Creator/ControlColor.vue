<template>
  <div class="control">
    <div class="title">{{ props.title }}</div>
    <div class="control-wrapper">
      <div class="current-asset">
        <input
          type="color"
          v-model="color"
          @input="emits('colorChange', color)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  title: string;
  color: string;
}>();

const emits = defineEmits<{ (e: "colorChange", type: string): void }>();

const color = ref(props.color);
</script>

<style scoped lang="scss">
.control {
  border: 2px solid #000;
  border-radius: 5px;
  margin: 0 0 0 10px;
  background: #1e1e1e;
  padding: 5px;
  flex: 1;

  .title {
    margin-bottom: 5px;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .control-wrapper {
    display: flex;

    .current-asset {
      width: 310px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 15px;
      font-size: 1.1rem;
    }

    input {
      width: 100%;
      background-color: transparent;
      border: none;
    }
  }
}
</style>
