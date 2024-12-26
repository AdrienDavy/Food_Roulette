import { gql } from "../../gql";


export const mutationDeleteIngredientType = gql(`
mutation DeleteIngredientType($id: ID!) {
  deleteIngredientType(id: $id) {
    id
  }
}
`);