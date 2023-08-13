import { render } from "@testing-library/react";
import { ListingFiltersProvider } from "providers";
import { BrowserRouter } from "react-router-dom";

import { ListingList } from "./ListingList";

it("renders successfully", () => {
  render(
    <BrowserRouter>
      <ListingFiltersProvider>
        <ListingList loading={false} error={false} />
      </ListingFiltersProvider>
    </BrowserRouter>,
  );

  expect(document.body).toHaveTextContent("Sorry, we couldn't find any property listing.");
});
