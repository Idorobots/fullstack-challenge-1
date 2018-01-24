import { observable } from "mobx";
import { Dim, Field } from "../services/api";

export class MainStore {
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

  constructor(dim: Dim, fields: Array<Field>) {
    this.error = undefined;

    this.availableFields = fields;
    this.selectedField = fields[0];
    this.boardDim = dim;
    this.solveEnabled = false;

    this.clearBoard(fields[0]);
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
}
