import { gql } from "../../gql";


export const mutationUpdateIngredient = gql(`
mutation UpdateIngredient($data: IngredientUpdateInput!, $id:ID!) {
  updateIngredient(data: $data, id:$id) {
    id
    name
  }
}
`);