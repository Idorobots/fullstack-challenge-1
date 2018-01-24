import * as preact from "preact";
import { MainContainer } from "./containers/main/mainContainer";
import "./main.css";
import { MainStore } from "./store/main";

type Config = {
  backendUrl: string
};

export function onLoad(config: Config) {
  console.log("App successfully loaded!", config);
  const container = document.createElement("div");
  document.body.appendChild(container);

  // TODO Could be initialized on backend.
  const mainStore = new MainStore(20, 15, [{
    type: "empty",
    weight: 0
  }, {
    type: "start",
    weight: 0
  }, {
    type: "end",
    weight: 0
  }, {
    type: "gravel",
    weight: 0
  }, {
    type: "boulder",
    weight: 0
  }, {
    type: "wh_entrance",
    weight: 0
  }, {
    type: "wh_exit",
    weight: 0
  }]);

  preact.render(<MainContainer store={mainStore}/>, container);
}

// Install the app entry point.
(function () {
  (window as any).startApp = onLoad;
})();
