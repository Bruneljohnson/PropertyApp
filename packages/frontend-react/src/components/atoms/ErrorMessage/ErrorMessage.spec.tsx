import { render, screen } from "@testing-library/react";

import { ErrorMessage } from "./ErrorMessage";

describe("ErrorMessage component", () => {
  it("renders successfully", () => {
    render(
      <ErrorMessage heading="Uh oh! Something went wrong." message="We are fixing the error!" />,
    );
    const heading = screen.getByRole("heading", { level: 6 });

    expect(heading).toHaveTextContent("We are fixing the error!");
  });
});
