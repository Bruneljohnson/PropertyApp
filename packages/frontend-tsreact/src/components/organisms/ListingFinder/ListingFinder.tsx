import { Grid } from "@mui/material";

import { ListingFilters, ListingList } from "../../molecules";
import { type ListingFinderProps } from "./ListingFinder.type";

export const ListingFinder = ({
  loading = true,
  error = false,
}: ListingFinderProps): JSX.Element => (
  <Grid component="section" height="100%" flex={1} container>
    <Grid component="aside" item xs={3} pr={4}>
      <ListingFilters loading={loading} error={error} />
    </Grid>
    <Grid item xs={9}>
      <ListingList loading={loading} error={error} />
    </Grid>
  </Grid>
);
