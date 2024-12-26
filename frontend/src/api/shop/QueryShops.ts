import { gql } from "../../gql";



export const queryShops = gql(`
query Shops {
  shops {
    id
    name
    image
  }
}
`);
