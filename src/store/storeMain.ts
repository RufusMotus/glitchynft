import { ref } from "vue";
import { defineStore } from "pinia";
import { Appwrite } from "appwrite";
export const useStore = defineStore("main", () => {
  const appwrite = new Appwrite();
  const user = ref();

  appwrite
    .setEndpoint(import.meta.env.VITE_APP_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APP_APPWRITE_PROJECT);

  const setUser = (data: Object) => {
    user.value = data;
  };

  const logoutUser = async () => {
    user.value = null;
    await appwrite.account.deleteSession("current");
  };

  return { appwrite, user, setUser, logoutUser };
});
