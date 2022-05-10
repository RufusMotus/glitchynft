<template>
  <div class="explore">
    <div class="title">Explore GlitchyNFTs</div>
    <div class="wrapper">
      <GlitchyNFTVue
        :base64="nft.glitchyNFTBase64"
        :name="nft.glitchyNFTName"
        :author="nft.ownerName"
        v-for="nft in glitchynfts"
        :key="nft.$id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "../store/storeMain";
import GlitchyNFT from "../interfaces/glitchyNFT";
import GlitchyNFTVue from "./GlitchyNFT.vue";

const store = useStore();
const glitchynfts = ref<Array<GlitchyNFT>>([]);
const accounts = ref<{ [key: string]: string }>({});

store.appwrite.subscribe("collections.glitchynfts.documents", (res) => {
  store.appwrite.database.listDocuments("glitchynfts").then((res) => {
    glitchynfts.value = res.documents as Array<GlitchyNFT>;
  });
});

store.appwrite.database.listDocuments("glitchynfts").then((res) => {
  glitchynfts.value = res.documents as Array<GlitchyNFT>;
});
</script>

<style scoped lang="scss">
.explore {
  width: 100%;
  .title {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 40px auto;
  }

  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    width: 80%;
    margin: 0 auto;
  }
}
</style>
