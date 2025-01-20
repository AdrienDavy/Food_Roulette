import { gql } from "../../gql";


export const mutationDeleteIngredientVariation = gql(`
mutation DeleteIngredientVariation($id: ID!) {
  deleteIngredientVariation(id: $id) {
    id
    name
    
  }
}
`);