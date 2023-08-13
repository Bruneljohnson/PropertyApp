import { render, screen } from "@testing-library/react";

import { ConditionalWrapper } from "./ConditionalWrapper";

describe("ConditionalWrapper component", () => {
  const defaultText = "Default text";
  const conditionalText = "I was wrapped";
  const wrappedText = `${defaultText} ${conditionalText}`;

  it("renders children without wrapper when condition is false", () => {
    render(
      <ConditionalWrapper
        if={false}
        wrapWith={children => (
          <div>
            {children} {conditionalText}
          </div>
        )}
      >
        {defaultText}
      </ConditionalWrapper>,
    );

    expect(screen.getByText(defaultText)).toBeInTheDocument();
    expect(screen.queryByText(wrappedText)).not.toBeInTheDocument();
  });

  it("renders children with wrapper when condition is true", () => {
    render(
      <ConditionalWrapper
        if
        wrapWith={children => (
          <div>
            {children} {conditionalText}
          </div>
        )}
      >
        {defaultText}
      </ConditionalWrapper>,
    );

    expect(screen.getByText(wrappedText)).toBeInTheDocument();
  });

  it("renders children without wrapper when no condition is provided", () => {
    render(
      <ConditionalWrapper
        wrapWith={children => (
          <div>
            {children} {conditionalText}
          </div>
        )}
      >
        {defaultText}
      </ConditionalWrapper>,
    );

    expect(screen.getByText(defaultText)).toBeInTheDocument();
    expect(screen.queryByText(wrappedText)).not.toBeInTheDocument();
  });
});
