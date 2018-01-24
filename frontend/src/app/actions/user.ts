import { action } from "mobx";
import { Field, MainStore } from "../store/main";

export class UserActions {
  store: MainStore;

  constructor(store: MainStore) {
    this.store = store;
  }

  @action.bound
  boardClicked(x: number, y: number) {
    const oldValue = this.store.getBoard(x, y);
    this.store.setBoard(x, y, this.store.selectedField);

    if (!this.store.checkSanity()) {
      this.store.setBoard(x, y, oldValue);
      this.errored("I can't let you do that...");
    }
  }

  @action.bound
  fieldSelected(field: Field) {
    this.store.selectedField = field;
  }

  @action.bound
  boardCleared() {
    this.store.clearBoard(this.store.availableFields[0]);
  }

  @action.bound
  errored(message: string) {
    this.store.error = message;
    setTimeout(() => {
      this.store.error = undefined;
    }, 3000);
  }

}
