<template>
  <div class="control">
    <div class="title">{{ props.title }}</div>
    <div class="control-wrapper">
      <fa
        :icon="['fas', 'angle-left']"
        class="icon"
        @click="emits('prevAsset', props.assetType)"
      />
      <div class="current-asset">
        {{ props.assetName }}
      </div>
      <fa
        :icon="['fas', 'angle-right']"
        class="icon"
        @click="emits('nextAsset', props.assetType)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  assetName: string;
  assetType: string;
}>();

const emits = defineEmits<{
  (e: "prevAsset", type: string): void;
  (e: "nextAsset", type: string): void;
}>();
</script>

<style scoped lang="scss">
.control {
  border: 2px solid #000;
  border-radius: 5px;
  margin: 0 0 12px 10px;
  background: #1e1e1e;
  padding: 5px;
  flex: 1;
  user-select: none;

  .title {
    margin-bottom: 5px;
    font-size: 1.2rem;
    font-weight: bold;
    pointer-events: none;
  }

  .control-wrapper {
    display: flex;

    .icon {
      width: 30px;
      height: 30px;

      &:hover {
        cursor: pointer;
      }
    }

    .current-asset {
      width: 250px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 15px;
      font-size: 1.1rem;
    }
  }
}
</style>
