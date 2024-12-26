import { gql } from "../../gql";


export const mutationCreateBrands = gql(`
mutation CreateBrands($data: BrandCreateInput[]!) {
  createBrands(data: $data) {
    id
  }
}
`);