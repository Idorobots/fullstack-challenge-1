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

  return api.getConfig().then((boardConfig) => {
    const mainStore = new MainStore(boardConfig.boardDim, boardConfig.availableFields);
    preact.render(<MainContainer store={mainStore} api={api} />, container);
  }).catch((error) => {
    // TODO Display the error message.
    console.error(error);
  });
}

// Install the app entry point.
(function () {
  (window as any).startApp = onLoad;
})();
