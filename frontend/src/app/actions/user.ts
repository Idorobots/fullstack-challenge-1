import { action } from "mobx";
import { MainStore } from "../store/main";

export class UserActions {
  store: MainStore;

  constructor(store: MainStore) {
    this.store = store;
  }

  @action.bound
  boardClicked(x: number, y: number) {
    this.store.board[y * this.store.boardDim.x + x] = this.store.selectedField;
  }

}
