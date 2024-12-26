import { gql } from "../../gql";

export const queryTags = gql(`
query QueryBrands {
  brands {
    id
    name
    image   
  }
}
`);
