import { gql } from "../../gql";


export const mutationCreateShops = gql(`
mutation CreateShops($data: ShopCreateInput[]!) {
  createShops(data: $data) {
    id
  }
}
`);