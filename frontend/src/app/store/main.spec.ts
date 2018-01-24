import { Field } from "../services/api";
import { MainStore } from "./main";

describe("MainStore", () => {
  it("sanity must be maintainable", () => {
    const fields: Array<Field> = [{ type: "empty", weight: 1}, {type: "start", weight: 0}, {type: "end", weight: 0}];
    const store = new MainStore({ x: 2, y: 2 }, fields);

    expect(store.checkSanity()).toEqual(true);

    store.setBoard(1, 0, fields[1]);
    expect(store.checkSanity()).toEqual(true);

    store.setBoard(0, 1, fields[1]);
    expect(store.checkSanity()).toEqual(false);

    store.setBoard(0, 1, fields[2]);
    expect(store.checkSanity()).toEqual(true);

    store.setBoard(1, 0, fields[2]);
    expect(store.checkSanity()).toEqual(false);
  });

  it("allow checking solvability", () => {
    const fields: Array<Field> = [{ type: "empty", weight: 1}, {type: "start", weight: 0}, {type: "end", weight: 0}];
    const store = new MainStore({ x: 2, y: 2 }, fields);

    expect(store.hasStart()).toEqual(false);
    expect(store.hasEnd()).toEqual(false);

    store.setBoard(0, 1, fields[1]);
    expect(store.hasStart()).toEqual(true);
    expect(store.hasEnd()).toEqual(false);

    store.setBoard(1, 0, fields[2]);
    expect(store.hasStart()).toEqual(true);
    expect(store.hasEnd()).toEqual(true);
  });
});
