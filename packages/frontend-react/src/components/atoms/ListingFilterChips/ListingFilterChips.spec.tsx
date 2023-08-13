import { render, screen, within } from "@testing-library/react";

import { ListingFilterChips } from "./ListingFilterChips";

describe("ListingFilterChips component", () => {
  it("renders successfully", () => {
    render(
      <ListingFilterChips
        items={[{ label: "Hello world", key: "hello-world" }]}
        selection={[]}
        setSelection={() => {}}
      />,
    );
    const list = screen.getByRole("list");
    const item = within(list).getByRole("listitem");

    expect(item).toHaveTextContent("Hello world");
  });
});
