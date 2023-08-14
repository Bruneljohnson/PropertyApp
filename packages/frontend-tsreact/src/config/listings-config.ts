export const LISTING_ERROR_MESSAGE = {
  heading: "Something went wrong",
  message: "Failed to connect to server",
};

export const LISTING_SEARCH_KEYS: string[] = ["price", "postcode", "city"];

const { REACT_APP_BACKEND_BASE_URL } = process.env;

export const BASE_URL = REACT_APP_BACKEND_BASE_URL;

export const DATA_URLS = {
  listings: "listings",
};

export const PAGE_URLS = {
  listings: "/listings",
  createListings: "/listings/create",
};

export const NAVIGATION_ITEMS = [
  { label: "Listings", url: PAGE_URLS.listings },
  { label: "Create", url: PAGE_URLS.createListings },
];
