import { gql } from "../../gql";


export const mutationDeleteShop = gql(`
mutation DeleteShop($id: ID!) {
  deleteShop(id: $id) {
    id
  }
}
`);