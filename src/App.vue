<template>
  <Navbar :path="currentPath" />
  <main>
    <suspense>
      <component :is="currentView"></component>
      <template #fallback> <div class="loading">Loading...</div></template>
    </suspense>
  </main>
  <div class="background"></div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "./store/storeMain";
import Navbar from "./components/Navbar.vue";
import Creator from "./components/Creator/Creator.vue";
import Auth from "./components/Auth/Auth.vue";
import Explore from "./components/Explore.vue";
import Account from "./components/Account.vue";
import NotFound from "./components/NotFound.vue";

const store = useStore();
store.appwrite.account.get().then((res) => {
  store.setUser(res);
});

const views: { [key: string]: any } = {
  "/": Explore,
  "/creator": Creator,
  "/auth": Auth,
  "/account": Account,
};

const currentPath = ref(window.location.hash);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return views[currentPath.value.slice(1) || "/"] || NotFound;
});
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  color: #fff;
  background: #373737;
  overflow: hidden;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  height: 100vh;
  width: 100vw;

  main {
    padding-top: 100px;
    margin: 0 auto;
    width: 100%;
    overflow-y: scroll;
    z-index: 1;
    display: flex;

    .loading {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .background {
    position: absolute;
    z-index: 0;
    inset: 0 0 0 0;
    opacity: 0.03;
    background-image: linear-gradient(
        30deg,
        #000000 12%,
        transparent 12.5%,
        transparent 87%,
        #000000 87.5%,
        #000000
      ),
      linear-gradient(
        150deg,
        #000000 12%,
        transparent 12.5%,
        transparent 87%,
        #000000 87.5%,
        #000000
      ),
      linear-gradient(
        30deg,
        #000000 12%,
        transparent 12.5%,
        transparent 87%,
        #000000 87.5%,
        #000000
      ),
      linear-gradient(
        150deg,
        #000000 12%,
        transparent 12.5%,
        transparent 87%,
        #000000 87.5%,
        #000000
      ),
      linear-gradient(
        60deg,
        #00000077 25%,
        transparent 25.5%,
        transparent 75%,
        #00000077 75%,
        #00000077
      ),
      linear-gradient(
        60deg,
        #00000077 25%,
        transparent 25.5%,
        transparent 75%,
        #00000077 75%,
        #00000077
      );
    background-size: 80px 140px;
    background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
  }
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: #000;
  border-radius: 5px;
  border: 1px solid #1e1e1e;
  background-clip: padding-box;
}
</style>
