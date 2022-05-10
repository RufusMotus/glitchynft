import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faAngleRight,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";

library.add(faAngleLeft, faAngleRight, faTrashCan);

createApp(App)
  .component("fa", FontAwesomeIcon)
  .use(createPinia())
  .mount("#app");
