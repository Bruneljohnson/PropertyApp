import { render } from "@testing-library/react";
import { ListingFiltersProvider } from "../../../providers";

import { ListingFilters } from "./ListingFilters";

it("renders successfully", () => {
  render(
    <ListingFiltersProvider>
      <ListingFilters loading={false} error={false} />
    </ListingFiltersProvider>,
  );

  expect(document.body).toHaveTextContent("PriceResetBedroomsResetLiving roomsResetBathroomsReset");
});
