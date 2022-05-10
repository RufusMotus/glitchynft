<template>
  <div class="login">
    <InputText placeholder="Email" @data-change="emailChange" />
    <InputText
      placeholder="Password"
      @data-change="passwordChange"
      :hide-input="true"
    />
    <div class="error" v-if="error">Wrong email and/or password.</div>
    <Button title="Login" @click="login" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InputText from "../Form/InputText.vue";
import Button from "../Atoms/Button.vue";
import { useStore } from "../../store/storeMain";

const store = useStore();
const email = ref("");
const password = ref("");
const error = ref(false);

const emailChange = (data: string) => {
  email.value = data;
};

const passwordChange = (data: string) => {
  password.value = data;
};

const login = () => {
  error.value = false;
  if (email.value && password.value) {
    store.appwrite.account
      .createSession(email.value, password.value)
      .then((res) => {
        store.appwrite.account.get().then((res) => {
          store.setUser(res);
        });
        window.location.hash = "#/";
      })
      .catch((err) => (error.value = true));
  }
};
</script>

<style scoped lang="scss">
.login {
  .error {
    color: #ff0000;
    margin-bottom: 10px;
  }
}
</style>
