import { render, screen } from "@testing-library/react";
import { ListingListItem } from "./Listing-ListItem";

import { MemoryRouter } from "react-router-dom";

describe("ListingListItem component", () => {
  const props = {
    id: "205a2dfb-a764-4fd0-8b78-8c830e125f4c",
    streetName: "25 test street",
    city: "test city",
    postcode: "te5 4st",
    summary: "5 bedroom terrace house, located in a leafy green area in West London.",
    bedrooms: "5",
    bathrooms: "3",
    livingrooms: "2",
    price: "300000",
    imageName: "073adf885d49cb19ee078e2cb13a9d2e8c240348133db0de0b27f30168af02b9.jpeg",
    imageUrl:
      "https://images.unsplash.com/photo-1578782785154-30ee3b8a3f95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    createdAt: "2023-08-10T14:59:14.292Z",
    updatedAt: "2023-08-10T14:59:14.292Z",
  };

  it("renders successfully", () => {
    render(<ListingListItem {...props} />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByText("5 Bedroom Property")).toBeInTheDocument();
  });
});
