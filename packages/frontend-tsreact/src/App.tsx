import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { CreateListingPage, ListingDetailPage, ListingsPage } from "./components/pages";

const ListingPageWrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/listings");
  }, [navigate]);

  return null;
};

export const App = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<ListingPageWrapper />} />
    <Route path="/listings" element={<ListingsPage />} />
    <Route path="/listings/:id" element={<ListingDetailPage />} />
    <Route path="/listings/create" element={<CreateListingPage />} />
  </Routes>
);
