<template>
  <div class="account">
    <div class="profile">
      <img :src="initials" alt="" loading="lazy" />
      <div class="info">
        <div class="name">{{ store.user.name }}</div>
        <div class="meta">
          Registered since
          {{ new Date(store.user.registration * 1000).toLocaleDateString() }}
        </div>
        <div class="meta">
          Created GlitchyNFTs:
          {{ ownerGlitchys.length }}
        </div>
      </div>
    </div>
    <div class="glitchynfts">
      <div class="title">Your GlitchyNFTs</div>
      <div class="wrapper" v-if="ownerGlitchys.length > 0">
        <GlitchyNFTVue
          :base64="nft.glitchyNFTBase64"
          :name="nft.glitchyNFTName"
          :author="nft.ownerName"
          :owner-view="true"
          v-for="nft in ownerGlitchys"
          :key="nft.$id"
          @click="deleteNFT(nft.$id)"
        />
      </div>
      <Button
        title="Create your first GlitchyNFT!"
        @click="toCreator"
        v-if="ownerGlitchys.length == 0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GlitchyNFT from "../interfaces/glitchyNFT";
import { useStore } from "../store/storeMain";
import { Query } from "appwrite";
import GlitchyNFTVue from "./GlitchyNFT.vue";
import Button from "./Atoms/Button.vue";

const store = useStore();
const initials = ref(
  `${store.appwrite.avatars.getInitials(undefined, 150, 150)}`
);
const ownerGlitchys = ref<Array<GlitchyNFT>>([]);

const deleteNFT = (id: string) => {
  store.appwrite.database
    .deleteDocument("glitchynfts", id)
    .then(() =>
      store.appwrite.database
        .listDocuments("glitchynfts", [Query.equal("ownerId", store.user.$id)])
        .then(
          (res) => (ownerGlitchys.value = res.documents as Array<GlitchyNFT>)
        )
    );
};

const toCreator = () => {
  window.location.hash = "#/creator";
};

store.appwrite.database
  .listDocuments("glitchynfts", [Query.equal("ownerId", store.user.$id)])
  .then((res) => (ownerGlitchys.value = res.documents as Array<GlitchyNFT>));
</script>

<style scoped lang="scss">
.account {
  width: 100%;
  display: flex;
  flex-direction: column;

  .profile {
    display: flex;
    align-items: center;
    margin: 0 auto;
    background: #1e1e1e;
    padding: 40px 50px;
    border-radius: 5px;
    margin-bottom: 50px;

    img {
      border-radius: 50%;
      margin-right: 30px;
    }

    .info {
      text-align: left;

      .name {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .meta {
        font-size: 0.9rem;
        margin-bottom: 5px;
      }
    }
  }

  .glitchynfts {
    .title {
      font-size: 2.7rem;
      font-weight: bold;
      margin-bottom: 30px;
    }

    .wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      width: 80%;
      margin: 0 auto;
    }

    :deep(.button) {
      width: fit-content;
      margin: 50px auto 0 auto;
    }
  }
}
</style>
