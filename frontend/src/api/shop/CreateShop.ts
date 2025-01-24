import { gql } from "../../gql";

export const mutationCreateShop = gql(`
mutation CreateShop($data: ShopCreateInput!) {
  createShop(data: $data) {
    id
    name
    image
  }
}
`);
