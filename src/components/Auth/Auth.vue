<template>
  <div class="auth">
    <div class="title">
      <span
        :class="{ active: currentView == 'login' }"
        @click="currentView = 'login'"
        >Login</span
      >
      /
      <span
        :class="{ active: currentView == 'register' }"
        @click="currentView = 'register'"
        >Register</span
      >
    </div>
    <component :is="views[currentView]"></component>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Login from "./Login.vue";
import Register from "./Register.vue";

const views: { [key: string]: any } = { login: Login, register: Register };
const currentView = ref("login");
</script>

<style scoped lang="scss">
.auth {
  margin: auto;
  background: #1e1e1e;
  padding: 50px;
  border-radius: 5px;
  max-width: 400px;

  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;

    span {
      transition: color 0.3s ease-in-out;
      &.active {
        color: #9932cd;
      }

      &:hover {
        cursor: pointer;
        color: #9932cd;
      }
    }
  }
}
</style>
