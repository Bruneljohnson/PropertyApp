import { CircularProgress } from "@mui/material";

import  { type PropertyListingType } from "../../../types";
import { ErrorMessage, Main, Wrapper } from "../../atoms";
import { Footer, Header, ListingView } from "../../molecules";
import { type ListingDetailTemplateProps } from "./ListingDetailTemplate.type";

export const ListingDetailTemplate = ({
  data,
  loading,
  error,
}: ListingDetailTemplateProps): JSX.Element => (
  <Wrapper>
    <Header />
    <Main>
      {error ? (
        <ErrorMessage />
      ) : loading ? (
        <CircularProgress />
        ) : (
            <ListingView {...data as unknown as PropertyListingType}  />
      )}
    </Main>
    <Footer />
  </Wrapper>
);
