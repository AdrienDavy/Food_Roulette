import { gql } from "../../gql";


export const mutationDeleteIngredient = gql(`
mutation DeleteIngredient($id: ID!) {
  deleteIngredient(id: $id) {
    id
    name
  }
}
`);