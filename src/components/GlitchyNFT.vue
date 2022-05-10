<template>
  <div class="glitchynft">
    <img :src="props.base64" alt="" loading="lazy" />
    <div class="meta">
      <div class="name">Name: {{ props.name }}</div>
      <div class="author">Author: {{ props.author }}</div>
      <div class="delete" v-if="props.ownerView">
        <fa
          :icon="['fas', 'trash-can']"
          class="icon"
          @click="emits('delete')"
        />
        Delete GlitchyNFT
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  base64: string;
  name: string;
  author: string;
  ownerView?: boolean;
}>();
const emits = defineEmits<{ (e: "delete"): void }>();
</script>

<style scoped lang="scss">
.glitchynft {
  background: #1e1e1e;
  border-radius: 15px;
  margin: 20px auto;
  width: 400px;
  max-width: 100%;
  text-align: left;
  font-size: 1.2rem;
  overflow: hidden;

  img {
    max-width: 100%;
    aspect-ratio: 1 / 1;
  }

  .meta {
    padding: 20px;

    .name {
      margin-bottom: 10px;
    }

    .author {
      font-size: 1rem;
    }

    .delete {
      color: #ff0000;
      margin-top: 10px;
      font-size: 1rem;
      transition: color 0.3s ease-in-out;

      &:hover {
        cursor: pointer;
        color: #ffffff;
      }
    }
  }
}
</style>
