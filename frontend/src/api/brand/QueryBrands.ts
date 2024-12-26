import { gql } from "../../gql";

export const queryBrands = gql(`
query QueryBrands {
  brands {
    id
    name
    image   
  }
}
`);
