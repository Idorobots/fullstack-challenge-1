import { Field, MainStore } from "../store/main";

describe("MainStore", () => {
  it("sanity must be maintainable", () => {
    const fields: Array<Field> = [{ type: "empty", weight: 1}, {type: "start", weight: 0}, {type: "end", weight: 0}];
    const store = new MainStore(2, 2, fields);

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
});
