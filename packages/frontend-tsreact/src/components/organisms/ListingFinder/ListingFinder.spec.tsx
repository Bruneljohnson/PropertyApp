import { render } from "@testing-library/react";
import { ListingFiltersProvider } from "../../../providers";
import { BrowserRouter } from "react-router-dom";

import { ListingFinder } from "./ListingFinder";

describe("BioFinder component", () => {
  it("renders successfully", () => {
    render(
      <BrowserRouter>
        <ListingFiltersProvider>
          <ListingFinder loading={false} error={false} />
        </ListingFiltersProvider>
      </BrowserRouter>,
    );

    expect(document.body).toHaveTextContent("Sorry, we couldn't find any property listing.");
  });
});
