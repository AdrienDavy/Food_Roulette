import { gql } from "../../gql";


export const queryIngredient = gql(`
query QueryIngredient($ingredientId: ID!) { 
  ingredient(id: $ingredientId) {    
    id
    name
    image
  }
}
`);