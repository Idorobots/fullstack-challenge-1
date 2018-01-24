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
    return fetch("//" + this.baseUrl + "/api/config").then((response) => response.json());
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
