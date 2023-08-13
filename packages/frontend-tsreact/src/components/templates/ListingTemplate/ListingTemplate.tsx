import { Main, Wrapper } from "../../atoms";
import { Footer, Header } from "../../molecules";
import { ListingFinder } from "../../organisms";
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
