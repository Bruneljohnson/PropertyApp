import { Main, Wrapper } from "../../atoms";
import { Footer, Header } from "../../molecules";
import { ListingForm } from "../../organisms";

export const CreateListingTemplate = (): JSX.Element => (
  <Wrapper>
    <Header />
    <Main>
      <ListingForm title="List Your Property" />
    </Main>
    <Footer />
  </Wrapper>
);
