import { render } from "@testing-library/react";

import { Wrapper } from "./Wrapper";

describe("Wrapper component", () => {
  it("renders successfully", () => {
    render(<Wrapper>Hello, world!</Wrapper>);

    expect(document.body).toHaveTextContent("Hello, world!");
  });
});
