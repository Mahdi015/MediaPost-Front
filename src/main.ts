import { createApp } from "vue";
import App from "./App.vue";
import "./assets/global.scss";
import "vue-universal-modal/dist/index.css";
import timeago from "vue-timeago3";
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueVideoPlayer from "@videojs-player/vue";

import "video.js/dist/video-js.css";

import VueUniversalModal from "vue-universal-modal";
const app = createApp(App);

app.use(VueUniversalModal, {
  teleportTarget: "#modals",
});
app.use(timeago);
app.use(Toast);
app.use(VueVideoPlayer);
app.mount("#app");
