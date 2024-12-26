import { gql } from "../gql";


export const queryIngredients = gql(`
query Ingredients {
  ingredients {
    id
    name
    image
  }
}
`);
