import { observable } from "mobx";

export type FieldType = "start" | "end" | "empty" | "gravel" | "boulder" | "wh_entrance" | "wh_exit";

export interface Field {
  type: FieldType;
  weight: number;
}

export class MainStore {
  @observable
  error?: string;

  availableFields: Array<Field>;

  @observable
  selectedField: Field;

  boardDim: {
    x: number;
    y: number;
  };

  @observable
  board: Array<Field>;

  constructor(dimX: number, dimY: number, fields: Array<Field>) {
    this.error = undefined;

    this.availableFields = fields;
    this.selectedField = fields[0];

    this.boardDim = {
      x: dimX,
      y: dimY
    };

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
}
