import { Field, MainStore } from "../store/main";
import { UserActions } from "./user";

describe("UserActions", () => {
  it("board contents should update when clicked", () => {
    const fields: Array<Field> = [{ type: "empty", weight: 1}, {type: "gravel", weight: 5}];
    const store = new MainStore(2, 2, fields);

    expect(store.board[0 * 2 + 1]).toEqual(fields[0]);

    const actions = new UserActions(store);
    store.selectedField = fields[1];
    actions.boardClicked(1, 0);

    expect(store.board[0 * 2 + 1]).toEqual(fields[1]);
  });

  it("selected field should update when control panel is clicked", () => {
    const fields: Array<Field> = [{ type: "empty", weight: 1}, {type: "gravel", weight: 5}];
    const store = new MainStore(2, 2, fields);

    expect(store.selectedField).toEqual(fields[0]);

    const actions = new UserActions(store);
    actions.fieldSelected(fields[1]);

    expect(store.selectedField).toEqual(fields[1]);
  });

  it("user should be able to update the board", () => {
    const fields: Array<Field> = [{ type: "empty", weight: 1}, {type: "gravel", weight: 5}];
    const store = new MainStore(2, 2, fields);
    const actions = new UserActions(store);

    expect(store.selectedField).toEqual(fields[0]);
    expect([...store.board]).toEqual([fields[0], fields[0], fields[0], fields[0]]);

    actions.fieldSelected(fields[1]);
    actions.boardClicked(0, 0);
    actions.boardClicked(0, 1);
    actions.boardClicked(1, 0);
    actions.boardClicked(1, 1);
    actions.fieldSelected(fields[0]);
    actions.boardClicked(0, 1);

    expect(store.selectedField).toEqual(fields[0]);
    expect([...store.board]).toEqual([fields[1], fields[1], fields[0], fields[1]]);
  });

  it("board contents should reset when cleared", () => {
    const fields: Array<Field> = [{ type: "empty", weight: 1}, {type: "gravel", weight: 5}];
    const store = new MainStore(2, 2, fields);

    store.board[0 * 2 + 1] = fields[1];
    store.board[1 * 2 + 0] = fields[1];

    const actions = new UserActions(store);

    expect([...store.board]).toEqual([fields[0], fields[1], fields[1], fields[0]]);

    actions.boardCleared();

    expect([...store.board]).toEqual([fields[0], fields[0], fields[0], fields[0]]);
  });
});
