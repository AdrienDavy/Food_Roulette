import { gql } from "../../gql";


export const queryIngredientVariations = gql(`
query QueryIngredientVariations {
  ingredientVariations {
    id
    name
    image
  }
}
`);
