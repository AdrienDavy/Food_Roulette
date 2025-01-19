import { gql } from "../../gql";


export const queryIngredientType = gql(`
query QueryIngredientType($ingredientTypeId: ID!) { 
  ingredientType(id: $ingredientTypeId) {    
    id
    name
    image
    shops {
      id
      name
      image
    }
    brand {
      id
      name
      image
    }
  }
}
`);