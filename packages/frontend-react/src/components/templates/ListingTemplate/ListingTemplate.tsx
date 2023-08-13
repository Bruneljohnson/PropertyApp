import { Main, Wrapper } from "components/atoms";
import { Footer, Header } from "components/molecules";
import { ListingFinder } from "components/organisms";

import { type ListingTemplateProps } from "./ListingTemplate.type";

export const ListingTemplate = (props: ListingTemplateProps): JSX.Element => (
  <Wrapper>
    <Header />
    <Main>
      <ListingFinder {...props} />
    </Main>
    <Footer />
  </Wrapper>
);
