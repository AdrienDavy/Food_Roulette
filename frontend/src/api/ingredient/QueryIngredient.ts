import { gql } from "../../gql";


export const queryIngredient = gql(`
query QueryIngredient($ingredientId: ID!) { 
  ingredient(id: $ingredientId) {    
    id
    name
    image
    hasIngredient
    type {
      id
      name
      image
    }
    variations {
      id
      name
      image
      hasIngredient
      brand {
        id
        name
        image
      }
      shops {
        id
        name
        image
      }
    }
  }
}
`);