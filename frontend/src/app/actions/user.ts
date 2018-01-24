import { action } from "mobx";
import { Field } from "../services/api";
import { MainStore } from "../store/main";

export class UserActions {
  store: MainStore;

  constructor(store: MainStore) {
    this.store = store;
  }

  @action.bound
  boardClicked(x: number, y: number) {
    const oldValue = this.store.getBoard(x, y);
    this.store.setBoard(x, y, this.store.selectedField);

    // Check error conditions.
    if (!this.store.checkSanity()) {
      this.store.setBoard(x, y, oldValue);
      this.errored("I can't let you do that...");
    }

    // Check solvability conditions.
    if (this.store.hasStart() && this.store.hasEnd()) {
      this.solvingEnabled(true);
    } else {
      this.solvingEnabled(false);
    }
  }

  @action.bound
  fieldSelected(field: Field) {
    this.store.selectedField = field;
  }

  @action.bound
  boardCleared() {
    this.store.clearBoard(this.store.availableFields[0]);
    this.solvingEnabled(false);
  }

  @action.bound
  errored(message: string) {
    this.store.error = message;
    setTimeout(() => {
      this.store.error = undefined;
    }, 3000);
  }

  @action.bound
  solvingEnabled(toggle: boolean) {
    this.store.solveEnabled = toggle;
  }

}
