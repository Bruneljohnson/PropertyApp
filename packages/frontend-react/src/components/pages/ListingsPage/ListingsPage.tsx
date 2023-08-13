import { ListingTemplate } from "components/templates";
import { BASE_URL } from "config";
import { useFetch } from "hooks";
import { ListingFiltersContext } from "providers";
import { useContext, useEffect } from "react";
import { type PropertyListingType, type ResponseType } from "types";

export const ListingsPage = (): JSX.Element => {
  const { res, loading, error } = useFetch<ResponseType<PropertyListingType[]>>(
    `${BASE_URL}/listings/`,
  );

  const { setListingsData } = useContext(ListingFiltersContext);

  useEffect(() => {
    if (!res) {
      return;
    }

    setListingsData(res.data);
  }, [res, setListingsData]);

  return <ListingTemplate loading={loading} error={Boolean(error)} />;
};
