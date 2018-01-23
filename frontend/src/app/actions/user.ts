import { action } from "mobx";
import { MainStore } from "../store/main";

export class UserActions {
  store: MainStore;

  constructor(store: MainStore) {
    this.store = store;
  }

  @action.bound
  mainButtonClicked() {
    console.log("Button clicked!");
  }

}
