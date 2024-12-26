import { gql } from "../../gql";


export const queryIngredientVariation = gql(`
query QueryIngredientVariation($ingredientVariationId: ID!) { 
  ingredientVariation(id: $ingredientVariationId) {    
    id
    name
    image
  }
}
`);