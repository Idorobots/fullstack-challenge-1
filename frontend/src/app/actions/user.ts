import { action } from "mobx";
import { Config, Coords, Field } from "../services/api";
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
      this.errored("I'm afraid I can't let you do that...");
      return;
    }

    // Reset solved path as it might have changed.
    this.store.solvedPath = [];

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
    this.store.solvedPath = [];
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

  @action.bound
  boardSolved(path: Array<Coords>) {
    this.store.solvedPath = path;
  }

  @action.bound
  configLoaded(config: Config) {
    this.store.setConfig(config);
  }
}
