import { CircularProgress } from "@mui/material";
import { ErrorMessage, Main, Wrapper } from "components/atoms";
import { Footer, Header } from "components/molecules";

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
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </Main>
    <Footer />
  </Wrapper>
);
