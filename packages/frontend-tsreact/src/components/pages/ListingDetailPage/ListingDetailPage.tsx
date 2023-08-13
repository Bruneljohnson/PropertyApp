import { useLocation } from "react-router-dom";

import { BASE_URL, DATA_URLS } from "../../../config";
import { useFetch } from "../../../hooks";
import { type PropertyListingType, type ResponseType } from "../../../types";
import { ListingDetailTemplate } from "../../templates";

export const ListingDetailPage = (): JSX.Element | null => {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];

  const { res, loading, error } = useFetch<ResponseType<PropertyListingType>>(
    `${BASE_URL}/${DATA_URLS.listings}/${id}`,
  );
  if (res) {
    return <ListingDetailTemplate data={res.data} loading={loading} error={Boolean(error)} />;
  }

  return null;
};
