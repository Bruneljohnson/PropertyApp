import { Main, Wrapper } from "components/atoms";
import { Footer, Header } from "components/molecules";
import { ListingForm } from "components/organisms";

export const CreateListingTemplate = (): JSX.Element => (
  <Wrapper>
    <Header />
    <Main>
      <ListingForm title="Create Listing" />
    </Main>
    <Footer />
  </Wrapper>
);
