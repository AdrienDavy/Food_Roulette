import { gql } from "../../gql";


export const mutationCreateIngredient = gql(`
mutation CreateIngredient($data: IngredientCreateInput!) {
  createIngredient(data: $data) {
    id
    name
    type {
      id
      name
      image
      }
  }
}
`);