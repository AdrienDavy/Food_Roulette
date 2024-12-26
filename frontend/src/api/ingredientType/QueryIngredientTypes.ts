import { gql } from "../../gql";


export const queryIngredientTypes = gql(`
query QueryIngredientTypes {
  ingredientTypes {
    id
    name
    image
  }
}
`);
