import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { PAGE_URLS } from "../../../config";
import { ListingFiltersContext } from "../../../providers";
import { ErrorMessage } from "../../atoms/ErrorMessage";
import { ListingListItem } from "../../atoms/Listing-ListItem";
import { type ListingListProps } from "./ListingList.type";

const initialResultsLength = 3;

export const ListingList = ({ loading = true, error = false }: ListingListProps): JSX.Element => {
  const { filteredListings } = useContext(ListingFiltersContext);
  const [resultsLength, setResultsLength] = useState(initialResultsLength);

  const newResultsLength = initialResultsLength + resultsLength;

  const handleLoadMore = () => {
    setResultsLength(
      newResultsLength > filteredListings.length ? filteredListings.length : newResultsLength,
    );
  };

  return (
    <Box height="100%">
      {error ? (
        <Box display="flex" justifyContent="center" alignItems="flex-start" height="100%">
          <ErrorMessage />
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h6" sx={{fontSize:{xs:"14px", md:"16px"}}}>
              {loading
                ? "Loading Property Listings, please wait..."
                : filteredListings.length > 0
                ? `${filteredListings.length} Result${filteredListings.length > 1 ? "s" : ""} found`
                : "Sorry, we couldn't find any property listing."}
            </Typography>
            <Button
                disabled={loading || error}
                component={Link}
                to={PAGE_URLS.createListings}
                variant="contained"
                sx={{ size: { xs: "xsmall", md: "large" }, fontSize: { xs: "10px", md: "16px" }, width: { xs: "50%" }, padding:{xs:"2px"} }}
            >
              List Your Property
            </Button>
          </Box>
          <Stack spacing={2}>
            {loading &&
              Array.from({ length: initialResultsLength }).map((_, i) => (
                <Skeleton animation="wave" height={110} key={i} variant="rounded" width="100%" />
              ))}

            {filteredListings.slice(0, resultsLength).map(propertyListing => (
              <ListingListItem {...propertyListing} key={propertyListing.id} />
            ))}
            {filteredListings?.length > initialResultsLength && (
              <Button
                onClick={() => {
                  handleLoadMore();
                }}
                disabled={resultsLength === filteredListings.length}
                sx={{ alignSelf: "center" }}
              >
                {resultsLength === filteredListings.length
                  ? "No more results"
                  : `Show ${
                      newResultsLength > filteredListings.length
                        ? filteredListings.length - resultsLength
                        : initialResultsLength
                    } more`}
              </Button>
            )}
          </Stack>
        </>
      )}
    </Box>
  );
};
