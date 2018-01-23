import { observable } from "mobx";

export type FieldType = "start" | "end" | "empty" | "gravel" | "boulder" | "wh_entrance" | "wh_exit";

export interface Field {
  type: FieldType;
  weight: number;
}

export class MainStore {
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

}
