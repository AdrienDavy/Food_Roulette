import { gql } from "../../gql";

export const mutationUpdateBrand = gql(`
mutation UpdateBrand($data: BrandUpdateInput!, $id:ID!) {
  updateBrand(data: $data, id:$id) {
    id
    name
  }
}
`);