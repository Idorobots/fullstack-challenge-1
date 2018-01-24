export type FieldType = "start" | "end" | "empty" | "gravel" | "boulder" | "wh_entrance" | "wh_exit";

export interface Field {
  type: FieldType;
  weight: number;
}

export interface Dim {
  x: number;
  y: number;
}

export type Coords = Dim;

export interface Config {
  availableFields: Array<Field>;
  boardDim: Dim;
}

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getConfig(): Promise<Config> {
    // TODO Pull this from the backend.
    return new Promise<Config>((resolve, reject) => {
      resolve({
        boardDim: {
          x: 25,
          y: 15
        },
        availableFields: [{
          type: "empty",
          weight: 0
        }, {
          type: "start",
          weight: 0
        }, {
          type: "end",
          weight: 0
        }, {
          type: "gravel",
          weight: 0
        }, {
          type: "boulder",
          weight: 0
        }, {
          type: "wh_entrance",
          weight: 0
        }, {
          type: "wh_exit",
          weight: 0
        }] as Array<Field>
      });
    });
  }

  solve(dim: Dim, board: Array<Field>): Promise<Array<Coords>> {
    return fetch("//" + this.baseUrl + "/api/solve", {
      method: "POST",
      body: JSON.stringify({
        boardDim: dim,
        board
      })
    }).then((response) => response.json());
  }

}
