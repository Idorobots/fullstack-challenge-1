import { observable } from "mobx";
import { Config, Coords, Dim, Field } from "../services/api";

export class MainStore {
  @observable
  configLoaded: boolean;

  @observable
  error?: string;

  @observable
  availableFields: Array<Field>;

  @observable
  selectedField: Field;

  @observable
  boardDim: Dim;

  @observable
  board: Array<Field>;

  @observable
  solveEnabled: boolean;

  @observable
  solvedPath: Array<Coords>;

  constructor() {
    this.configLoaded = false;
    this.error = undefined;
    this.availableFields = [];
    this.selectedField = {
      type: "empty",
      weight: 0
    };
    this.boardDim = {
      x: 0,
      y: 0
    };
    this.board = [];
    this.solveEnabled = false;
    this.solvedPath = [];
  }

  clearBoard(field: Field) {
    // NOTE Initializes the board to the first one of the available fileds.
    this.board = Array.from(new Array(this.boardDim.x * this.boardDim.y), (val, index) => field);
  }

  setBoard(x: number, y: number, field: Field) {
    this.board[y * this.boardDim.x + x] = field;
  }

  getBoard(x: number, y: number): Field {
    return this.board[y * this.boardDim.x + x];
  }

  checkSanity(): boolean {
    const starts = this.board.filter((field) => field.type === "start");
    const ends = this.board.filter((field) => field.type === "end");
    return starts.length <= 1 && ends.length <= 1;
  }

  hasStart(): boolean {
    return this.board.filter((field) => field.type === "start").length > 0;
  }

  hasEnd(): boolean {
    return this.board.filter((field) => field.type === "end").length > 0;
  }

  setConfig(config: Config) {
    this.configLoaded = true;
    this.boardDim = config.boardDim;
    this.availableFields = config.availableFields;
    this.selectedField = this.availableFields[0];
    this.clearBoard(this.availableFields[0]);
  }
}
