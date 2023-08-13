import { render, screen } from "@testing-library/react";

import { Main } from "./Main";

describe("Main component", () => {
  it("renders successfully", () => {
    render(<Main>Hello, world!</Main>);
    const main = screen.getByRole("main");

    expect(main).toHaveTextContent("Hello, world!");
  });
});
