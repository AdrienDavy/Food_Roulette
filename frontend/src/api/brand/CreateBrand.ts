import { gql } from "../../gql";


export const mutationCreateBrand = gql(`
mutation CreateBrand($data: BrandCreateInput!) {
  createBrand(data: $data) {
    id
    name
    image
  }
}
`);