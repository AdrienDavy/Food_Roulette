import { gql } from "../../gql";


export const mutationDeleteBrand = gql(`
mutation DeleteBrand($id: ID!) {
  deleteBrand(id: $id) {
    id
    name
  }
}
`);