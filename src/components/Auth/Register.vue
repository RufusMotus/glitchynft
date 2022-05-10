<template>
  <div class="register">
    <InputText
      placeholder="Nickname"
      :validator="nicknameValidator"
      error-message="Nickname should be at least 3 characters long"
      @data-change="nicknameChange"
    />
    <InputText
      placeholder="Email"
      :validator="emailValidator"
      error-message="Invalid email"
      @data-change="emailChange"
    />
    <InputText
      placeholder="Password"
      :validator="passwordValidator"
      error-message="Password should be at least 8 characters long"
      @data-change="passwordChange"
    />
    <div class="error" v-if="error">{{ errorMessage }}</div>
    <div class="success" v-if="success">
      Account created. You can login now.
    </div>
    <Button title="Register" @click="register" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InputText from "../Form/InputText.vue";
import Button from "../Atoms/Button.vue";
import { useStore } from "../../store/storeMain";

const store = useStore();
const nickname = ref("");
const email = ref("");
const password = ref("");
const error = ref(false);
const errorMessage = ref("");
const success = ref(false);

const nicknameValidator = (data: string) => {
  return data.length >= 3 ? true : false;
};

const emailValidator = (data: string) => {
  return data.match(/.*@.*/);
};

const passwordValidator = (data: string) => {
  return data.length >= 8 ? true : false;
};

const nicknameChange = (data: string) => {
  nickname.value = data;
};

const emailChange = (data: string) => {
  email.value = data;
};

const passwordChange = (data: string) => {
  password.value = data;
};

const register = () => {
  error.value = false;
  success.value = false;
  if (nickname.value && email.value && password.value) {
    store.appwrite.account
      .create("unique()", email.value, password.value, nickname.value)
      .then(() => (success.value = true))
      .catch((err) => {
        error.value = true;
        errorMessage.value = err.message;
      });
  }
};
</script>

<style scoped lang="scss">
.register {
  .error {
    color: #ff0000;
    margin-bottom: 10px;
  }

  .success {
    color: #00b828;
    margin-bottom: 10px;
  }
}
</style>
