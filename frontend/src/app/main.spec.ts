import * as preact from "preact";
import * as main from "./main";

describe("main", () => {
  it("should render stuff", (done) => {
    spyOn(preact, "render");

    main.onLoad({
      backendUrl: "localhost:1234"
    }).then((_) => {
      expect(preact.render).toHaveBeenCalled();
      done();
    });
  });
});
