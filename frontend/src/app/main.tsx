import * as preact from "preact";
import { MainContainer } from "./containers/main/mainContainer";
import "./main.css";
import { ApiService } from "./services/api";
import { MainStore } from "./store/main";

type Config = {
  backendUrl: string
};

export function onLoad(config: Config): Promise<void> {
  console.log("App successfully loaded!", config);

  const container = document.createElement("div");
  document.body.appendChild(container);

  const api = new ApiService(config.backendUrl);
  const mainStore = new MainStore();
  preact.render(<MainContainer store={mainStore} api={api} />, container);

  return api.getConfig().then((boardConfig) => {
    mainStore.setConfig(boardConfig);
  }).catch((error) => {
    // TODO Display the error message.
    console.error(error);
  });
}

// Install the app entry point.
(function () {
  (window as any).startApp = onLoad;
})();
