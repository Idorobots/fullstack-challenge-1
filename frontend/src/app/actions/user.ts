import { action } from "mobx";
import { Field, MainStore } from "../store/main";

export class UserActions {
  store: MainStore;

  constructor(store: MainStore) {
    this.store = store;
  }

  @action.bound
  boardClicked(x: number, y: number) {
    // TODO Ensure that only a single start & stop can be placed.
    this.store.board[y * this.store.boardDim.x + x] = this.store.selectedField;
  }

  @action.bound
  fieldSelected(field: Field) {
    this.store.selectedField = field;
  }

}
