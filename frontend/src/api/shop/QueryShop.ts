import { gql } from "../../gql";


export const queryShop = gql(`
query Shop($shopId: ID!) {
  shop(id: $shopId) {
    id
    name
    image
  }
}
`);
