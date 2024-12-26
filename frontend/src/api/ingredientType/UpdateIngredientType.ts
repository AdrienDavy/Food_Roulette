import { gql } from "../../gql";


export const mutationUpdateIngredientType = gql(`
mutation UpdateIngredientType($data: IngredientTypeUpdateInput!, $id:ID!) {
  updateIngredientType(data: $data, id:$id) {
    id
  }
}
`);