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
});
