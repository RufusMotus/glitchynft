<template>
  <div class="text-input">
    <label :for="props.placeholder">{{ props.placeholder }}</label>
    <input
      :id="props.placeholder"
      :type="props.hideInput ? 'password' : 'text'"
      :placeholder="props.placeholder"
      @change="dataChange(inputValue)"
      v-model="inputValue"
    />
    <div class="error" v-if="error">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  placeholder: string;
  validator?: Function;
  errorMessage?: string;
  hideInput?: boolean;
}>();

const emits = defineEmits<{
  (e: "dataChange", type: string): string | Error;
}>();
const dataChange = (input: string) => {
  if (props.validator) {
    if (props.validator(input)) {
      error.value = false;
      emits("dataChange", input);
    } else {
      error.value = true;
    }
  } else {
    emits("dataChange", input);
  }
};

const inputValue = ref("");
const error = ref();
const errorMessage = ref(props.errorMessage);
</script>

<style scoped lang="scss">
.text-input {
  width: 100%;

  label {
    display: block;
    text-align: left;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
  input {
    width: 300px;
    padding: 5px;
    margin-bottom: 10px;
    background: transparent;
    border: 1px solid #ffffff2f;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 1.1rem;
    color: #ffffff;
    outline: none;
  }
  .error {
    color: #ff0000;
    text-align: left;
    margin-bottom: 10px;
  }
}
</style>
