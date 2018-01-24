import * as preact from "preact";
import { UserActions } from "./actions/user";
import { MainContainer } from "./containers/main/mainContainer";
import "./main.css";
import { ApiService } from "./services/api";
import { MainStore } from "./store/main";

type Config = {
  backendUrl: string
};

export function onLoad(config: Config): Promise<void> {
  console.log("App successfully loaded!", config);

  const api = new ApiService(config.backendUrl);
  const mainStore = new MainStore();
  const actions = new UserActions(mainStore);
  preact.render(<MainContainer store={mainStore} api={api} />, document.body);

  return api.getConfig().then((boardConfig) => {
    actions.configLoaded(boardConfig);
  }).catch((error) => {
    // TODO Display the error message.
    actions.errored("Looks like the backend is having problems...");
    console.error(error);
  });
}

// Install the app entry point.
(function () {
  (window as any).startApp = onLoad;
})();
