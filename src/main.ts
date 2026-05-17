import "./styles/base.css";
import "./styles/home.css";
import "./styles/study.css";

import { AudioController } from "./modules/audio";
import { installAssetCssVariables } from "./modules/assets";
import { initializeCloudSync } from "./modules/cloudSync";
import { getRoute, onRouteChange } from "./modules/router";
import { registerServiceWorker } from "./modules/pwa";
import { createAccountView } from "./views/AccountView";
import { createHomeView } from "./views/HomeView";
import { createSettingsView } from "./views/SettingsView";
import { createStudyView } from "./views/StudyView";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root is missing.");
}

const appRoot = app;
installAssetCssVariables();
const audioController = new AudioController();
document.title = "即刻日语";

function render(): void {
  const route = getRoute();

  appRoot.innerHTML = "";

  if (route === "study") {
    appRoot.append(createStudyView("learn", audioController));
  } else if (route === "review") {
    appRoot.append(createStudyView("review", audioController));
  } else if (route === "settings") {
    appRoot.append(createSettingsView(audioController));
  } else if (route === "account") {
    appRoot.append(createAccountView());
  } else {
    appRoot.append(createHomeView(audioController));
  }
}

onRouteChange(render);
render();
void audioController.syncMusic();
initializeCloudSync();
registerServiceWorker();
