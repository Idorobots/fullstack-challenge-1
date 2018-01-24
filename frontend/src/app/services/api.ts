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
          weight: 1
        }, {
          type: "start",
          weight: 0
        }, {
          type: "end",
          weight: 1
        }, {
          type: "gravel",
          weight: 2
        }, {
          type: "boulder",
          weight: 0
        }, {
          type: "wh_entrance",
          weight: 0
        }, {
          type: "wh_exit",
          weight: 1
        }] as Array<Field>
      });
    });
  }

  solve(dim: Dim, board: Array<Field>): Promise<Array<Coords>> {
    return fetch("//" + this.baseUrl + "/api/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        boardDim: dim,
        board
      })
    }).then((response) => response.json());
  }

}
