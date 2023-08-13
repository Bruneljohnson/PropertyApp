import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { ListingForm } from "./ListingForm";

describe("BioForm component", () => {
  it("renders successfully", () => {
    render(
      <BrowserRouter>
        <ListingForm title="foo" />
      </BrowserRouter>,
    );

    expect(document.body).toHaveTextContent("Next");
  });
});
