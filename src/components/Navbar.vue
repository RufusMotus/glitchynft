<template>
  <div class="navbar">
    <a href="#/" :class="['link', { active: props.path == '#/' }]"> Explore </a>
    <a
      href="#/creator"
      :class="['link', { active: props.path == '#/creator' }]"
    >
      Create GlitchyNFT
    </a>
    <a
      href="#/auth"
      :class="['link', { active: props.path == '#/auth' }]"
      v-if="!store.user"
    >
      Login/Register
    </a>
    <a
      href="#/account"
      :class="['link', { active: props.path == '#/account' }]"
      v-if="store.user"
    >
      {{ store.user.name }}
    </a>
    <a href="#/" class="link" v-if="store.user" @click="logout"> Logout </a>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../store/storeMain";

const store = useStore();
const props = defineProps<{ path: string }>();

const logout = (e: any) => {
  e.preventDefault();
  store.logoutUser().then(() => {
    window.location.hash = "#/";
  });
};
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 65px;
  background: #1e1e1e;

  .link {
    padding: 20px;
    color: #ffffff;
    text-decoration: none;
    transition: color 0.3s ease-in-out;

    &.active {
      color: #800080;
    }

    &:hover {
      cursor: pointer;
      color: #800080;
    }
  }
}
</style>
