import { render, screen } from "@testing-library/react";
import { ListingFiltersProvider } from "../../../providers";

import { ListingSearch } from "./ListingSearch";

it("renders successfully", () => {
  render(
    <ListingFiltersProvider>
      <ListingSearch loading={false} />
    </ListingFiltersProvider>,
  );
  const search = screen.getByRole("textbox");

  expect(search).toHaveAttribute("placeholder", expect.stringContaining("Search"));
});
